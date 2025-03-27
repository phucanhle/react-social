import { useState, useRef, useMemo, memo, Suspense, lazy, useEffect, useCallback } from "react";
import Comment from "./Comment";
import FullViewImage from "./FullViewImage";
import { useTranslation } from "../hooks/useTranslation";
import useImageCache from "../hooks/useImageCache";
import "./Feed.css";

// Lazy load FullViewImage component
const LazyFullViewImage = lazy(() => import("./FullViewImage"));

const CommentItem = memo(({ comment }) => {
    const [avatarError, setAvatarError] = useState(false);
    const defaultAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(comment.user.name) + "&background=random";

    const handleAvatarError = () => {
        setAvatarError(true);
    };

    return (
        <div className="comment-item">
            <div className="comment-avatar">
                <img 
                    src={avatarError ? defaultAvatar : comment.user.avatar} 
                    alt={comment.user.name}
                    onError={handleAvatarError}
                    loading="lazy"
                />
            </div>
            <div className="comment-content">
                <p className="comment-user">{comment.user.name}</p>
                <p className="comment-text">{comment.content}</p>
            </div>
        </div>
    );
});

const MediaItem = memo(({ item, index, isVideo, onMediaClick, onMediaLoad, onError }) => {
    const { cachedUrl, isLoading, error } = useImageCache(item);

    if (isVideo(item)) {
        return (
            <video
                key={index}
                src={item}
                controls
                onClick={() => onMediaClick(index)}
                onLoadedData={onMediaLoad}
            />
        );
    }

    if (isLoading) {
        return <div className="image-placeholder" />;
    }

    if (error) {
        return <div className="image-error">Lỗi tải ảnh</div>;
    }

    return (
        <img
            key={index}
            src={cachedUrl}
            alt={`Image ${index + 1}`}
            onClick={() => onMediaClick(index)}
            onLoad={onMediaLoad}
            loading="lazy"
            decoding="async"
            width="100%"
            height="auto"
            style={{ aspectRatio: '1' }}
            onError={onError}
        />
    );
});

const Feed = memo(({ post }) => {
    const { user, content, imgSrc } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [fullViewMediaIndex, setFullViewMediaIndex] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentPage, setCommentPage] = useState(1);
    const COMMENTS_PER_PAGE = 5;
    const commentInputRef = useRef(null);
    const { t } = useTranslation();
    const [showAllComments, setShowAllComments] = useState(false);
    const MAX_INITIAL_COMMENTS = 3;

    // Tối ưu việc tải hình ảnh
    const [imageLoadError, setImageLoadError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;

    // Memoize các giá trị được tính toán
    const postData = useMemo(() => ({
        user,
        content,
        imgSrc,
        postid: post.postid
    }), [user, content, imgSrc, post.postid]);

    // Memoize các hàm xử lý
    const handleNext = useCallback(() => {
        setFullViewMediaIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
    }, [imgSrc.length]);

    const handlePrev = useCallback(() => {
        setFullViewMediaIndex(
            (prevIndex) => (prevIndex - 1 + imgSrc.length) % imgSrc.length
        );
    }, [imgSrc.length]);

    const isVideo = useCallback((url) => {
        return url.match(/\.(mp4|webm|ogg)$/i) || url.startsWith('data:video/');
    }, []);

    const handleLike = useCallback(() => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    }, [isLiked]);

    const handleSave = useCallback(() => {
        setIsSaved(!isSaved);
        if (!isSaved) {
            // Tạo dữ liệu feed đã tối ưu
            const optimizedPostData = {
                postid: post.postid,
                user: {
                    name: user.name,
                    avatar: user.avatar
                },
                content: content,
                imgSrc: imgSrc.slice(0, 10), // Giới hạn số lượng ảnh
                savedAt: Date.now()
            };

            // Kiểm tra dung lượng localStorage
            const storage = window.localStorage;
            let totalSize = 0;
            for (let key in storage) {
                if (storage.hasOwnProperty(key)) {
                    totalSize += storage[key].length + key.length;
                }
            }

            // Nếu tổng dung lượng vượt quá 5MB, xóa các feed cũ nhất
            const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB
            if (totalSize > MAX_STORAGE_SIZE) {
                const savedPosts = Object.keys(storage)
                    .filter(key => key.startsWith('saved_post_'))
                    .map(key => ({
                        key,
                        timestamp: JSON.parse(storage[key]).savedAt
                    }))
                    .sort((a, b) => a.timestamp - b.timestamp);

                // Xóa 20% feed cũ nhất
                const postsToDelete = Math.ceil(savedPosts.length * 0.2);
                savedPosts.slice(0, postsToDelete).forEach(post => {
                    storage.removeItem(post.key);
                });
            }

            // Lưu feed mới
            localStorage.setItem(`saved_post_${post.postid}`, JSON.stringify(optimizedPostData));
        } else {
            localStorage.removeItem(`saved_post_${post.postid}`);
        }
    }, [isSaved, post.postid, user, content, imgSrc]);

    const handleComment = useCallback(() => {
        setIsCommenting(!isCommenting);
        if (!isCommenting && commentInputRef.current) {
            setTimeout(() => {
                commentInputRef.current.focus();
            }, 100);
        }
    }, [isCommenting]);

    const handleAddComment = useCallback((commentText) => {
        if (!commentText.trim()) return;
        
        const newComment = {
            id: Date.now(),
            user: {
                name: "Người dùng hiện tại",
                avatar: "https://via.placeholder.com/40"
            },
            content: commentText,
            createdAt: new Date().toISOString()
        };

        setComments(prev => {
            const updatedComments = [newComment, ...prev];
            return updatedComments.slice(0, 50);
        });
        setCommentCount(prev => prev + 1);
    }, []);

    const handleLoadMoreComments = useCallback(() => {
        setCommentPage(prev => prev + 1);
    }, []);

    const handleMediaClick = useCallback((index) => {
        setFullViewMediaIndex(index);
    }, []);

    const handleImageError = useCallback(() => {
        if (retryCount < MAX_RETRIES) {
            setRetryCount(prev => prev + 1);
        } else {
            setImageLoadError(true);
        }
    }, [retryCount]);

    // Memoize media items với xử lý lỗi
    const mediaItems = useMemo(() => (
        imgSrc.map((item, index) => (
            <MediaItem
                key={index}
                item={item}
                index={index}
                isVideo={isVideo}
                onMediaClick={handleMediaClick}
                onError={handleImageError}
            />
        ))
    ), [imgSrc, isVideo, handleMediaClick, handleImageError]);

    // Memoize comments đã được phân trang
    const paginatedComments = useMemo(() => {
        if (showAllComments) {
            return comments.slice(0, commentPage * COMMENTS_PER_PAGE);
        }
        return comments.slice(0, MAX_INITIAL_COMMENTS);
    }, [comments, commentPage, showAllComments]);

    // Memoize comment items với phân trang
    const commentItems = useMemo(() => (
        <>
            {paginatedComments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
            {!showAllComments && comments.length > MAX_INITIAL_COMMENTS && (
                <button 
                    className="load-more-comments"
                    onClick={() => setShowAllComments(true)}
                >
                    {t('post.viewMoreComments', { count: comments.length - MAX_INITIAL_COMMENTS })}
                </button>
            )}
            {showAllComments && comments.length > paginatedComments.length && (
                <button 
                    className="load-more-comments"
                    onClick={handleLoadMoreComments}
                >
                    {t('post.loadMoreComments')}
                </button>
            )}
        </>
    ), [paginatedComments, comments.length, handleLoadMoreComments, showAllComments, t]);

    // Memoize action buttons
    const actionButtons = useMemo(() => (
        <div className="feed-actions">
            <button onClick={handleLike}>
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                {t('post.likes')}
            </button>
            <button onClick={handleComment}>
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
                {t('post.comments')}
            </button>
            <button onClick={handleSave}>
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"
                    />
                </svg>
                {t('post.shares')}
            </button>
        </div>
    ), [handleLike, handleComment, handleSave, t]);

    return (
        <div className="feed-container">
            <div className="feed-header">
                <img 
                    src={user.avatar} 
                    alt={`avatar-of-${user.name}`} 
                    loading="lazy"
                />
                <h3>{user.name}</h3>
            </div>
            <div className="feed-content">{content}</div>
            {imgSrc && imgSrc.length > 0 && (
                <div className="image-grid" style={{ 
                    display: 'grid',
                    gap: '8px',
                    gridTemplateColumns: imgSrc.length === 1 ? '1fr' : 
                                       imgSrc.length === 2 ? '1fr 1fr' :
                                       imgSrc.length === 3 ? '1fr 1fr' :
                                       imgSrc.length === 4 ? '1fr 1fr' : 
                                       'repeat(3, 1fr)',
                    gridTemplateRows: imgSrc.length === 3 ? '1fr 1fr' : 'auto',
                    gridAutoRows: '1fr'
                }}>
                    {mediaItems}
                </div>
            )}
            {fullViewMediaIndex !== null && !isVideo(imgSrc[fullViewMediaIndex]) && (
                <Suspense fallback={<div className="loading-state" />}>
                    <LazyFullViewImage
                        src={imgSrc[fullViewMediaIndex]}
                        onClose={() => setFullViewMediaIndex(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        currentIndex={fullViewMediaIndex}
                        totalImages={imgSrc.length}
                    />
                </Suspense>
            )}
            {actionButtons}
            {commentItems}
            {isCommenting && (
                <Comment 
                    ref={commentInputRef}
                    onSubmit={handleAddComment}
                />
            )}
            
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.post.postid === nextProps.post.postid &&
           prevProps.post.content === nextProps.post.content &&
           prevProps.post.imgSrc.length === nextProps.post.imgSrc.length;
});

Feed.displayName = "Feed";

export default Feed;
