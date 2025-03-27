import { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import FullViewImage from "./FullViewImage";

const Container = styled.div`
    position: relative;
    padding: 16px;
    margin: 16px 0;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    & > p {
        margin: 12px 0;
        font-size: 15px;
        line-height: 1.5;
        color: #1a1a1a;
    }
`;

const MediaBox = styled.div`
    width: 100%;
    display: grid;
    margin: 12px 0;
    border-radius: 12px;
    overflow: hidden;
    background-color: #f8f9fa;

    & > img, & > video {
        border-radius: 12px;
        width: 100%;
        cursor: pointer;
        object-fit: cover;
        transition: transform 0.3s ease;
        
        &:hover {
            transform: scale(1.02);
        }
    }

    &[data-grid="2"] {
        grid-template-columns: 50% 50%;
        gap: 4px;
        & > img, & > video {
            border-radius: 12px;
            width: 100%;
        }
    }

    &[data-grid="3"] {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        gap: 4px;
        & > img:first-child, & > video:first-child {
            grid-row: span 2;
            height: 100%;
            object-fit: cover;
        }
    }
`;

const ActionGroup = styled.li`
    width: 100%;
    padding: 8px 0;
    border-radius: 12px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
    cursor: pointer;
    
    & .user {
        display: flex;
        align-items: center;
        gap: 12px;
        
        & img {
            position: relative;
            aspect-ratio: 1/1;
            object-fit: cover;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 2px solid #f0f2f5;
            transition: transform 0.2s ease;
            
            &:hover {
                transform: scale(1.05);
            }
        }
        
        & p {
            margin: 0;
            font-weight: 600;
            font-size: 15px;
            color: #1a1a1a;
        }
    }

    & .actions {
        display: flex;
        align-items: center;
        gap: 8px;
        
        & button {
            position: relative;
            width: 36px;
            height: 36px;
            text-align: center;
            vertical-align: middle;
            background-color: transparent;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background-color: #f0f2f5;
                transform: scale(1.05);
            }
        }
    }
`;

const Interact = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #f0f2f5;

    & button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        border: 0;
        outline: none;
        font-size: inherit;
        width: 33.33%;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        
        & p {
            font-size: 14px;
            margin-left: 8px;
            color: #65676b;
            font-weight: 500;
        }
        
        &:hover {
            background-color: #f0f2f5;
            transform: translateY(-1px);
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

const Feed = ({ post }) => {
    const { user, content, imgSrc } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [fullViewMediaIndex, setFullViewMediaIndex] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const handleMediaLoad = () => {
        setLoaded(true);
    };

    const handleNext = () => {
        setFullViewMediaIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
    };

    const handlePrev = () => {
        setFullViewMediaIndex(
            (prevIndex) => (prevIndex - 1 + imgSrc.length) % imgSrc.length
        );
    };

    const isVideo = (url) => {
        return url.match(/\.(mp4|webm|ogg)$/i) || url.startsWith('data:video/');
    };

    return (
        <Container>
            <ActionGroup>
                <div className="user">
                    <img src={user.avatar} alt={`avatar-of-${user.name}`} />
                    <p>{user.name}</p>
                </div>
                <div className="actions">
                    <button>
                        <svg
                            class="w-[32px] h-[32px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="3"
                                d="M6 12h.01m6 0h.01m5.99 0h.01"
                            />
                        </svg>
                    </button>
                    <button>
                        <svg
                            class="w-[32px] h-[32px] text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                                d="M6 18 17.94 6M18 18 6.06 6"
                            />
                        </svg>
                    </button>
                </div>
            </ActionGroup>
            <p>{content}</p>
            <MediaBox data-grid={imgSrc.length}>
                {!loaded && <SkeletonWrapper />}
                {imgSrc.map((item, index) => (
                    isVideo(item) ? (
                        <video
                            key={index}
                            src={item}
                            controls
                            onClick={() => setFullViewMediaIndex(index)}
                            onLoadedData={handleMediaLoad}
                        />
                    ) : (
                        <img
                            key={index}
                            src={item}
                            alt={`Image ${index + 1} of ${content} by ${user.name}`}
                            onClick={() => setFullViewMediaIndex(index)}
                            onLoad={handleMediaLoad}
                        />
                    )
                ))}
            </MediaBox>
            {fullViewMediaIndex !== null && !isVideo(imgSrc[fullViewMediaIndex]) && (
                <FullViewImage
                    src={imgSrc[fullViewMediaIndex]}
                    onClose={() => setFullViewMediaIndex(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
            <Interact>
                <button onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="#F5004F"
                            viewBox="0 0 24 24"
                        >
                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                        </svg>
                    ) : (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                            />
                        </svg>
                    )}
                    <p>Thích</p>
                </button>
                <button onClick={() => setIsCommenting(!isCommenting)}>
                    {isCommenting ? (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="#0D7C66"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                                clip-rule="evenodd"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                            />
                        </svg>
                    )}
                    <p>Bình luận</p>
                </button>
                <button onClick={() => setIsSaved(!isSaved)}>
                    {isSaved ? (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="#295F98"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z" />
                        </svg>
                    ) : (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                            />
                        </svg>
                    )}
                    <p>Lưu</p>
                </button>
            </Interact>
            {isCommenting && <Comment />}
        </Container>
    );
};

export default Feed;
