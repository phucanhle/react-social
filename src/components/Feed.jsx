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

const Feed = ({ post }) => {
    const { user, content, imgSrc } = post;
    const [isLiked, setIsLiked] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [fullViewImageIndex, setFullViewImageIndex] = useState(null);

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
                {imgSrc.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt={`post-about-${content}-of-${user.name}`}
                        onClick={() => setFullViewImageIndex(index)}
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
                <button onClick={() => setIsLiked(!isLiked)}>{isLiked ? <strong>Liked</strong> : "Like"}</button>
                <button onClick={() => setIsCommenting(!isCommenting)}>
                    {isCommenting ? <strong>Comment</strong> : "Comment"}
                </button>
            </Interact>
            {isCommenting && <Comment />}
        </Container>
    );
};

export default Feed;
