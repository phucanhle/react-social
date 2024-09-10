import styled from "styled-components";
import { useState } from "react";

const FullViewContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
`;

const FullViewImageStyled = styled.img`
    max-height: 80vh;
    max-width: 80vw;
    width: auto;
    height: auto;
    border-radius: 10px;
    box-shadow: rgba(255, 255, 255, 0.15) 0px 48px 100px 0px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 40px;
    right: 40px;
    color: white;
    padding: 5px;
    border: 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

const NavigationButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
    ${(props) => (props.left ? "left: 20px;" : "right: 20px;")}
`;

const SkeletonWrapper = styled.div`
    position: fixed;
    width: 80vw;
    height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    .loader {
        width: 64px;
        height: 64px;
        position: relative;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
    }
    .loader:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40px;
        height: 40px;
        transform: rotate(45deg) translate(30%, 40%);
        background: #ff9371;
        box-shadow: 32px -34px 0 5px #ff3d00;
        animation: slide 2s infinite ease-in-out alternate;
    }
    .loader:after {
        content: "";
        position: absolute;
        left: 10px;
        top: 10px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ff3d00;
        transform: rotate(0deg);
        transform-origin: 35px 145px;
        animation: rotate 2s infinite ease-in-out;
    }

    @keyframes slide {
        0%,
        100% {
            bottom: -35px;
        }
        25%,
        75% {
            bottom: -2px;
        }
        20%,
        80% {
            bottom: 2px;
        }
    }
    @keyframes rotate {
        0% {
            transform: rotate(-15deg);
        }
        25%,
        75% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(25deg);
        }
    }
`;

const FullViewImage = ({ src, onClose, onNext, onPrev }) => {
    const [loaded, setLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoaded(true);
    };
    const handleFullViewClick = (e) => {
        e.stopPropagation();
    };

    return (
        <FullViewContainer onClick={onClose}>
            {!loaded && (
                <SkeletonWrapper>
                    <span class="loader"></span>
                </SkeletonWrapper>
            )}
            <FullViewImageStyled
                src={src}
                alt="full-view"
                onClick={handleFullViewClick}
                onLoad={handleImageLoad}
                style={{ display: !loaded ? "none" : "block" }}
            />
            <CloseButton
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            >
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                    />
                </svg>
            </CloseButton>
            {onNext && (
                <>
                    <NavigationButton
                        left
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrev();
                        }}
                    >
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 6l-6 6 6 6"
                            />
                        </svg>
                    </NavigationButton>
                    <NavigationButton
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                    >
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 6l6 6-6 6"
                            />
                        </svg>
                    </NavigationButton>
                </>
            )}
        </FullViewContainer>
    );
};

export default FullViewImage;
