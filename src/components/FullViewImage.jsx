import React from "react";
import styled from "styled-components";

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

const FullViewImage = ({ src, onClose, onNext, onPrev }) => {
  const handleFullViewClick = (e) => {
    e.stopPropagation();
  };

  return (
    <FullViewContainer onClick={onClose}>
      <FullViewImageStyled
        src={src}
        alt="full-view"
        onClick={handleFullViewClick}
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
