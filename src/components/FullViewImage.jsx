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
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const FullViewImageStyled = styled.img`
    max-height: 90vh;
    max-width: 90vw;
    width: auto;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: zoomIn 0.3s ease;
    object-fit: contain;

    @keyframes zoomIn {
        from {
            transform: scale(0.95);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
    width: 40px;
    height: 40px;
    color: white;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    backdrop-filter: blur(4px);

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const NavigationButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    color: white;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    backdrop-filter: blur(4px);

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) scale(1.1);
    }

    &:active {
        transform: translateY(-50%) scale(0.95);
    }

    ${(props) => (props.left ? "left: 24px;" : "right: 24px;")}
`;

const SkeletonWrapper = styled.div`
    position: fixed;
    width: 90vw;
    height: 90vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    backdrop-filter: blur(4px);

    .loader {
        width: 80px;
        height: 80px;
        position: relative;
        background: transparent;
        border-radius: 50%;
        overflow: hidden;
    }

    .loader:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        transform: rotate(45deg) translate(30%, 40%);
        background: #0d7c66;
        box-shadow: 40px -42px 0 5px #0b6b56;
        animation: slide 2s infinite ease-in-out alternate;
    }

    .loader:after {
        content: "";
        position: absolute;
        left: 12px;
        top: 12px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #0b6b56;
        transform: rotate(0deg);
        transform-origin: 35px 145px;
        animation: rotate 2s infinite ease-in-out;
    }

    @keyframes slide {
        0%, 100% {
            bottom: -35px;
        }
        25%, 75% {
            bottom: -2px;
        }
        20%, 80% {
            bottom: 2px;
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(-15deg);
        }
        25%, 75% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(25deg);
        }
    }
`;

const ImageCounter = styled.div`
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    gap: 8px;
`;

const FullViewImage = ({ src, onClose, onNext, onPrev, currentIndex, totalImages }) => {
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
                    <span className="loader"></span>
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
            {totalImages > 1 && (
                <ImageCounter>
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    {currentIndex + 1} / {totalImages}
                </ImageCounter>
            )}
        </FullViewContainer>
    );
};

export default FullViewImage;
