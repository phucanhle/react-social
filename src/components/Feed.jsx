import { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import FullViewImage from "./FullViewImage";

const Container = styled.div`
    position: relative;
    padding: 10px 20px;
    margin: 10px 0;
    background-color: white;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    & > p {
        margin: 10px 0;
    }
`;

const ImageBox = styled.div`
    width: 100%;
    display: grid;

    & > img {
        border-radius: 8px;
        width: 100%;
        cursor: pointer;
    }

    &[data-grid="2"] {
        grid-template-columns: 50% 50%;
        gap: 5px;
        & > img {
            border-radius: 8px;
            width: 100%;
        }
    }

    &[data-grid="3"] {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        gap: 5px;
        & > img:first-child {
            grid-row: span 2;
            height: 100%;
            object-fit: cover;
        }
    }
`;

const Friend = styled.li`
    width: 100%;
    margin: 10px 0;
    padding: 5px 0;
    border-radius: 12px;
    position: relative;
    display: flex;
    align-items: center;
    color: inherit;
    cursor: pointer;
    & img {
        position: relative;
        aspect-ratio: 1/1;
        object-fit: cover;
        width: 50px;
        border-radius: 100px;
    }
    & p {
        margin: 5px 10px;
    }
`;

const Interact = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #eee;
    margin: 25px 0 0;
    padding: 25px 20px;

    & button {
        background: transparent;
        border: 0;
        outline: none;
        font-size: inherit;
        width: 50%;
        padding: 10px;
        border-radius: 12px;
        cursor: pointer;
        & strong {
            color: var(--navy);
            font-weight: 600;
        }
        &:hover {
            background-color: var(--white);
        }
    }
`;

const SkeletonWrapper = styled.div`
    width: 100%;
    background-color: gray;
`;

const Feed = ({ post }) => {
    const { user, content, imgSrc } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [fullViewImageIndex, setFullViewImageIndex] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoaded(true);
    };
    const handleNext = () => {
        setFullViewImageIndex((prevIndex) => (prevIndex + 1) % imgSrc.length);
    };

    const handlePrev = () => {
        setFullViewImageIndex((prevIndex) => (prevIndex - 1 + imgSrc.length) % imgSrc.length);
    };

    return (
        <Container>
            <Friend>
                <img src={user.avatar} alt={`avatar-of-${user.name}`} />
                <p>{user.name}</p>
            </Friend>
            <p>{content}</p>
            <ImageBox data-grid={imgSrc.length}>
                {!loaded && <SkeletonWrapper />}
                {imgSrc.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt={`Image ${index + 1} of ${content} by ${user.name}`}
                        onClick={() => setFullViewImageIndex(index)}
                        onLoad={handleImageLoad}
                    />
                ))}
            </ImageBox>
            {fullViewImageIndex !== null && (
                <FullViewImage
                    src={imgSrc[fullViewImageIndex]}
                    onClose={() => setFullViewImageIndex(null)}
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
                            fill="red"
                            viewBox="0 0 24 24"
                        >
                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                        </svg>
                    ) : (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
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
                                stroke-width="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                            />
                        </svg>
                    )}
                </button>
                <button onClick={() => setIsCommenting(!isCommenting)}>
                    {isCommenting ? (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="blue"
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
                            width="24"
                            height="24"
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
                </button>
                <button onClick={() => setIsSaved(!isSaved)}>
                    {isSaved ? (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="blue"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z" />
                        </svg>
                    ) : (
                        <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
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
                                stroke-width="2"
                                d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                            />
                        </svg>
                    )}
                </button>
            </Interact>
            {isCommenting && <Comment />}
        </Container>
    );
};

export default Feed;
