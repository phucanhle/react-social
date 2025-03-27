import React, { Suspense, lazy } from "react";
import "./Home.css";

const FeatureList = lazy(() => import("../components/FeatureList"));
const FeedList = lazy(() => import("../components/FeedList"));
const FriendList = lazy(() => import("../components/FriendList"));
const Banner = lazy(() => import("../components/Banner"));

const FallbackComponent = () => (
    <div className="fallback-component">
        <div className="loading" />
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
        <article className="article">
            <div className="left-div">
                <Suspense fallback={<FallbackComponent />}>
                    <FeatureList />
                </Suspense>
            </div>
            <div className="middle-div">
                <Suspense fallback={<FallbackComponent />}>
                    <FeedList feeds={feeds} post={true} />
                </Suspense>
            </div>
            <div className="right-div">
                <Suspense fallback={<FallbackComponent />}>
                    <FriendList />
                </Suspense>
            </div>
        </article>
    );
};

export default HomePage;
