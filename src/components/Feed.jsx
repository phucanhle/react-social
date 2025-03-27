import { useState, useRef, useMemo, memo, Suspense, lazy } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import FullViewImage from "./FullViewImage";
import { useTranslation } from "../hooks/useTranslation";


// Lazy load FullViewImage component
const LazyFullViewImage = lazy(() => import("./FullViewImage"));

const Container = styled.div`
    width: 100%;
    background-color: white;
    padding: 24px;
    margin: 20px 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 16px;
    transition: all 0.3s ease;
    &:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    & img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    & h3 {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
    }
`;

const Content = styled.div`
    font-size: 14px;
    color: #1a1a1a;
    line-height: 1.5;
    margin-bottom: 16px;
`;

const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.count}, 1fr);
    gap: 8px;
    margin-bottom: 16px;

    & img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.02);
        }
    }
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f2f5;

    & button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: none;
        background: none;
        color: #65676b;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 8px;

        &:hover {
            background-color: #f0f2f5;
            color: #0d7c66;
        }

        & svg {
            width: 20px;
            height: 20px;
        }
    }
`;

const SkeletonWrapper = styled.div`
    width: 100%;
    height: 300px;
    background: linear-gradient(90deg, #f0f2f5 25%, #e4e6eb 50%, #f0f2f5 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 12px;

    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;

const CommentItem = memo(({ comment }) => (
    <div className="comment-item">
        <img src={comment.user.avatar} alt={comment.user.name} />
        <div className="comment-content">
            <p className="comment-user">{comment.user.name}</p>
            <p className="comment-text">{comment.content}</p>
        </div>
    </div>
));

const MediaItem = memo(({ item, index, isVideo, onMediaClick, onMediaLoad }) => {
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
    return (
        <img
            key={index}
            src={item}
            alt={`Image ${index + 1}`}
            onClick={() => onMediaClick(index)}
            onLoad={onMediaLoad}
            loading="lazy"
        />
    );
});

const Feed = memo(({ post }) => {
    const { user, content, imgSrc } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [fullViewMediaIndex, setFullViewMediaIndex] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const commentInputRef = useRef(null);
    const { t } = useTranslation();

    // Memoize handlers
    const handleMediaLoad = useMemo(() => () => {
        setLoaded(true);
    }, []);

    const handleNext = useMemo(() => () => {
        setFullViewMediaIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
    }, [imgSrc.length]);

    const handlePrev = useMemo(() => () => {
        setFullViewMediaIndex(
            (prevIndex) => (prevIndex - 1 + imgSrc.length) % imgSrc.length
        );
    }, [imgSrc.length]);

    const isVideo = useMemo(() => (url) => {
        return url.match(/\.(mp4|webm|ogg)$/i) || url.startsWith('data:video/');
    }, []);

    const handleLike = useMemo(() => () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    }, [isLiked]);

    const handleSave = useMemo(() => () => {
        setIsSaved(!isSaved);
        if (!isSaved) {
            localStorage.setItem(`saved_post_${post.postid}`, JSON.stringify(post));
        } else {
            localStorage.removeItem(`saved_post_${post.postid}`);
        }
    }, [isSaved, post]);

    const handleComment = useMemo(() => () => {
        setIsCommenting(!isCommenting);
        if (!isCommenting && commentInputRef.current) {
            setTimeout(() => {
                commentInputRef.current.focus();
            }, 100);
        }
    }, [isCommenting]);

    const handleAddComment = useMemo(() => (commentText) => {
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

        setComments(prev => [...prev, newComment]);
        setCommentCount(prev => prev + 1);
    }, []);

    const handleMediaClick = useMemo(() => (index) => {
        setFullViewMediaIndex(index);
    }, []);

    // Memoize media items
    const mediaItems = useMemo(() => (
        imgSrc.map((item, index) => (
            <MediaItem
                key={index}
                item={item}
                index={index}
                isVideo={isVideo}
                onMediaClick={handleMediaClick}
                onMediaLoad={handleMediaLoad}
            />
        ))
    ), [imgSrc, isVideo, handleMediaClick, handleMediaLoad]);

    // Memoize comment items
    const commentItems = useMemo(() => (
        comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
        ))
    ), [comments]);

    return (
        <Container>
            <Header>
                <img src={user.avatar} alt={`avatar-of-${user.name}`} loading="lazy" />
                <h3>{user.name}</h3>
            </Header>
            <Content>{content}</Content>
            {imgSrc && imgSrc.length > 0 && (
                <ImageGrid count={imgSrc.length}>
                    {mediaItems}
                </ImageGrid>
            )}
            {fullViewMediaIndex !== null && !isVideo(imgSrc[fullViewMediaIndex]) && (
                <Suspense fallback={<SkeletonWrapper />}>
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
            <Actions>
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
            </Actions>
            {isCommenting && (
                <Comment 
                    ref={commentInputRef}
                    onSubmit={handleAddComment}
                />
            )}
            {comments.length > 0 && (
                <div className="comments-list">
                    {commentItems}
                </div>
            )}
        </Container>
    );
});

Feed.displayName = "Feed";

export default Feed;
