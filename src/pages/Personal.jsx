import styled from "styled-components";
import { useSelector } from "react-redux";
import PersonaInfor from "../components/PersonInfor";
import FeedList from "../components/FeedList";

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
`;

const History = styled.div`
    display: grid;
    padding: 20px 0;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    @media screen and (max-width: 898px) {
        grid-template-columns: 1fr;
    }
`;

const Content = styled.div`
    height: 100%;
    max-height: 500px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    @media screen and (max-width: 898px) {
        display: none;
    }
`;

const Images = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    & img {
        width: 30%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 5px;
    }
`;
const Title = styled.h1`
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 10px;
`;

const Personal = () => {
    const user = useSelector((state) => state.auth.user);

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
    return (
        <Container>
            <PersonaInfor user={user} />
            <History>
                <Content>
                    <Title>Ảnh</Title>

                    <Images>
                        {feedList.own.map((post, index) =>
                            post.imgSrc.map((src, imgIndex) => (
                                <img key={`h${index}-${imgIndex}`} src={src} alt="Hình" />
                            )),
                        )}
                    </Images>
                </Content>
                <FeedList feeds={feedList.own} />
            </History>
        </Container>
    );
};

export default Personal;
