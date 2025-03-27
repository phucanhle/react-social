import styled, { keyframes } from "styled-components";
import React, { Suspense, lazy } from "react";

const FeatureList = lazy(() => import("../components/FeatureList"));
const FeedList = lazy(() => import("../components/FeedList"));
const FriendList = lazy(() => import("../components/FriendList"));
const Banner = lazy(() => import("../components/Banner"));

const Article = styled.article`
    width: 100%;
    max-width: 1440px;
    min-height: 100vh;
    padding-top: 60px;
    margin: 20px auto;
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    gap: 24px;
    background-color: #f0f2f5;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 300px;
        padding: 60px 16px 24px;
        gap: 16px;

        & > div:first-child {
            display: none;
        }
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 60px 12px 16px;
        gap: 12px;

        & > div:last-child {
            display: none;
        }
    }
`;

const LeftDiv = styled.div`
    position: sticky;
    top: 76px;
    height: fit-content;
    width: 100%;
    max-width: 300px;

    @media screen and (max-width: 768px) {
        position: fixed;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        max-width: 100%;
        z-index: 100;
        background: white;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 16px 16px 0 0;
        padding: 12px 0;
    }
`;

const MiddleDiv = styled.div`
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (max-width: 768px) {
        max-width: 100%;
        gap: 16px;
        padding-bottom: 80px;
    }
`;

const RightDiv = styled.div`
    position: sticky;
    top: 76px;
    height: fit-content;
    width: 100%;
    max-width: 300px;

    @media screen and (max-width: 768px) {
        position: fixed;
        bottom: 0;
        right: 0;
        top: auto;
        width: 100%;
        max-width: 100%;
        z-index: 100;
        background: white;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 16px 16px 0 0;
        padding: 12px 0;
    }
`;

const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Loading = styled.div`
    width: 48px;
    height: 48px;
    border: 5px solid #0d7c66;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${rotation} 1s linear infinite;

    @media screen and (max-width: 768px) {
        width: 36px;
        height: 36px;
        border-width: 4px;
    }
`;

const FallbackComponent = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        padding: '16px'
    }}>
        <Loading />
    </div>
);

const HomePage = () => {
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
                avatar: "https://plus.unsplash.com/premium_photo-1670282393321-b34c6a4695b0",
                name: "Trần Thị B",
            },
            content: "Món ăn mới làm hôm nay",
            imgSrc: [
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
                "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba"
            ],
        },
        {
            postid: 3,
            user: {
                avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556",
                name: "Lê Văn C",
            },
            content: "Buổi tập gym hôm nay", 
            imgSrc: [
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ],
        },
        {
            postid: 4,
            user: {
                avatar: "https://plus.unsplash.com/premium_photo-1673792686366-27a26e9d5ea5",
                name: "Phạm Thị D",
            },
            content: "Sách hay nên đọc",
            imgSrc: [
                "https://images.unsplash.com/photo-1512820790803-83ca734da794",
                "https://images.unsplash.com/photo-1612969308146-066d55f37ccb"
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
