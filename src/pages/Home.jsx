import styled, { keyframes } from "styled-components";
import React, { Suspense, lazy } from "react";

const FeatureList = lazy(() => import("../components/FeatureList"));
const FeedList = lazy(() => import("../components/FeedList"));
const FriendList = lazy(() => import("../components/FriendList"));
const Banner = lazy(() => import("../components/Banner"));

const Article = styled.article`
    width: 100%;
    padding-top: 50px;
    display: grid;
    grid-template-columns: 25% 50% 25%;

    @media screen and (max-width: 898px) {
        grid-template-columns: 100%;
        padding: 50px 20px;
    }

    @media screen and (min-width: 899px) and (max-width: 1098px) {
        padding: 50px 20px;
        grid-template-columns: 70% 30%;
    }
`;

const LeftDiv = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: start;
    @media screen and (max-width: 1098px) {
        display: none;
    }
`;

const MiddleDiv = styled.div`
    position: relative;
    padding: 20px 0;
    display: flex;
    justify-content: center;
`;

const RightDiv = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: end;

    @media screen and (max-width: 898px) {
        display: none;
    }
`; // Define the keyframes outside of the component
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component with fixed keyframe reference
const Loading = styled.div`
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;
`;
const FallbackComponent = () => <Loading />;

const HomePage = () => {
    // Temporary array for the list of the first 10 posts, concatenated at the backend.
    const feeds = [
        {
            postid: 1,
            user: {
                avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
                name: "Alice",
            },
            content: "A mountain",
            imgSrc: [
                "https://www.thoughtco.com/thmb/EKnmgoAr_X4TrIpxBiPYu9lao9U=/2000x1333/filters:fill(auto,1)/GettyImages-468963673-5ad40ad2fa6bcc0036add08a.jpg",
            ],
        },
        {
            postid: 2,
            user: {
                avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
                name: "Alice",
            },
            content: "Dragon ball hehehe",
            imgSrc: [
                "https://i.pinimg.com/564x/02/ba/65/02ba65e0f3b88a0f679f6f1e0b9b4a59.jpg",
                "https://wallpaperaccess.com/full/4211388.jpg",
                "https://i.pinimg.com/originals/d8/07/11/d80711b7df97434667621b8054ba8956.jpg",
            ],
        },
        {
            postid: 3,
            user: {
                avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
                name: "Alice",
            },
            content: "New Home!!",
            imgSrc: [
                "https://i.pinimg.com/564x/8b/3b/1d/8b3b1d69c4e45f903002a9ab1ffa53d3.jpg",
                "https://i.pinimg.com/564x/55/67/f9/5567f98308341de496b26d8a88f896c9.jpg",
            ],
        },
        {
            postid: 4,
            user: {
                avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
                name: "Me",
            },
            content: "New Home!!",
            imgSrc: [
                "https://i.pinimg.com/564x/8b/3b/1d/8b3b1d69c4e45f903002a9ab1ffa53d3.jpg",
                "https://i.pinimg.com/564x/55/67/f9/5567f98308341de496b26d8a88f896c9.jpg",
            ],
        },
    ];

    return (
        <Article>
            <LeftDiv>
                <Suspense fallback={<FallbackComponent />}>
                    <FeatureList />
                    <Banner />
                </Suspense>
            </LeftDiv>
            <MiddleDiv>
                <Suspense fallback={<FallbackComponent />}>
                    <FeedList feeds={feeds} post={true} />
                </Suspense>
            </MiddleDiv>
            <RightDiv>
                <Suspense fallback={<FallbackComponent />}>
                    <FriendList />
                </Suspense>
            </RightDiv>
        </Article>
    );
};
export default HomePage;
