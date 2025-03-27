import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PersonaInfor from "../components/PersonInfor";
import FeedList from "../components/FeedList";
import FullViewImage from "../components/FullViewImage";
import { userDetail } from "../mockdata/searchData";

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 24px 24px;
    background-color: #f0f2f5;
`;

const History = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;
    margin-top: 24px;

    @media screen and (max-width: 898px) {
        grid-template-columns: 1fr;
    }
`;

const Media = styled.div`
    height: fit-content;
    padding: 24px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    @media screen and (max-width: 898px) {
        display: none;
    }
`;

const Images = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 16px;

    & img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
        content: '';
        display: block;
        width: 4px;
        height: 20px;
        background-color: #0d7c66;
        border-radius: 2px;
    }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const UserProfile = () => {
    const { id } = useParams();
    const [fullViewImageIndex, setFullViewImageIndex] = useState(null);
    const [img, setImg] = useState(null);
    const [user, setUser] = useState(null);
    const [feedList, setFeedList] = useState({ own: [] });

    useEffect(() => {
        // Trong thực tế, đây sẽ là API call để lấy thông tin user
        setUser(userDetail);
        
        // Trong thực tế, đây sẽ là API call để lấy bài viết của user
        setFeedList({
            own: userDetail.recentPosts.map(post => ({
                postid: post.id,
                user: {
                    avatar: userDetail.avatar,
                    name: userDetail.name,
                },
                content: post.content,
                imgSrc: [], // Trong thực tế sẽ có ảnh từ API
            }))
        });
    }, [id]);

    const toggleImg = (imgSrc, imgIndex) => {
        setImg(imgSrc);
        setFullViewImageIndex(imgSrc);
    };

    if (!user) {
        return <div>Đang tải...</div>;
    }

    return (
        <Container>
            <PersonaInfor user={user} />
            <History>
                <Media>
                    <Title>Ảnh</Title>
                    <Images>
                        {feedList.own.map((post, index) =>
                            post.imgSrc.map((src, imgIndex) => (
                                <img
                                    key={`h${index}-${imgIndex}`}
                                    src={src}
                                    alt="Hình"
                                    onClick={() => toggleImg(src, imgIndex)}
                                />
                            ))
                        )}
                    </Images>
                    {fullViewImageIndex !== null && (
                        <FullViewImage
                            src={img}
                            onClose={() => setFullViewImageIndex(null)}
                        />
                    )}
                </Media>
                <Content>
                    <FeedList feeds={feedList.own} />
                </Content>
            </History>
        </Container>
    );
};

export default UserProfile; 