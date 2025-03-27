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
    justify-content: end;
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
    justify-content: start;
    screen and (max-width: 898px) {
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
                avatar: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049",
                name: "Nguyễn Văn A", 
            },
            content: "Chuyến du lịch Đà Lạt cuối tuần",
            imgSrc: [
                "https://images.unsplash.com/photo-1586595276832-b6840c79bdfc",
                "https://images.unsplash.com/photo-1573743136692-468c0424f2d2",
                "https://images.unsplash.com/photo-1583414424369-779c5c39c518"
            ],
        },
        {
            postid: 2,
            user: {
                avatar: "https://i.pinimg.com/564x/94/68/5c/94685c60484e97f582707a69bb5613e3.jpg",
                name: "Trần Thị B",
            },
            content: "Món ăn mới làm hôm nay",
            imgSrc: [
                "https://i.pinimg.com/564x/02/ba/65/02ba65e0f3b88a0f679f6f1e0b9b4a59.jpg",
                "https://i.pinimg.com/564x/61/7d/ef/617def7d58f1daa7ea9cc127af8bb1c0.jpg"
            ],
        },
        {
            postid: 3,
            user: {
                avatar: "https://i.pinimg.com/564x/1e/90/7f/1e907f17d3f4a5677377f2823d338e51.jpg",
                name: "Lê Văn C",
            },
            content: "Buổi tập gym hôm nay", 
            imgSrc: [
                "https://i.pinimg.com/564x/0e/78/a5/0e78a5a9c7d93c6acc8a9a5b5d3712c4.jpg"
            ],
        },
        {
            postid: 4,
            user: {
                avatar: "https://i.pinimg.com/564x/d8/2a/d6/d82ad6d4d6f7b51dba6c0c0794cd003d.jpg",
                name: "Phạm Thị D",
            },
            content: "Sách hay nên đọc",
            imgSrc: [
                "https://i.pinimg.com/564x/f1/86/51/f18651eeb6600f8c68299936d1d61db5.jpg",
                "https://i.pinimg.com/564x/e9/b5/fb/e9b5fb8676f7dd4d2ca1e0315cd8c676.jpg"
            ],
        },
    ];

    return (
        <Article>
            <LeftDiv>
                <Suspense fallback={<FallbackComponent />}>
                    <FeatureList />
              
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
