import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import PersonaInfor from "../components/PersonInfor";
import FeedList from "../components/FeedList";
import FullViewImage from "../components/FullViewImage";

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

const Personal = () => {
    const user = useSelector((state) => state.auth.user);
    const [fullViewImageIndex, setFullViewImageIndex] = useState(null);
    const [img, setImg] = useState(null);
    const feedList = {
        own: [
            {
                postid: 1,
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
        ],
    };

    const toggleImg = (imgSrc, imgIndex) => {
        setImg(imgSrc);
        setFullViewImageIndex(imgSrc);
    };

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

export default Personal;
