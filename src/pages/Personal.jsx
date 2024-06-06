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

    return (
        <Container>
            <PersonaInfor user={user} />
            <History>
                <Content>
                    <Title>Ảnh</Title>

                    <Images>
                        <img
                            src="https://th.bing.com/th/id/R.d04ab4b23b2e4b577f28bb38a5cdaf4e?rik=oV4iTAagIbE2CA&pid=ImgRaw&r=0"
                            alt=""
                        />
                        <img
                            src="https://th.bing.com/th/id/R.d04ab4b23b2e4b577f28bb38a5cdaf4e?rik=oV4iTAagIbE2CA&pid=ImgRaw&r=0"
                            alt=""
                        />
                        <img
                            src="https://th.bing.com/th/id/R.9ee7bba93761fc61058385ef4976691e?rik=%2bZZTQFWjeDTAbA&pid=ImgRaw&r=0"
                            alt=""
                        />
                        <img
                            src="https://th.bing.com/th/id/R.82ea13502345d780f70ff12c7b32532f?rik=WTxji5R0HLW5ig&pid=ImgRaw&r=0"
                            alt=""
                        />
                        <img
                            src="https://th.bing.com/th/id/R.d04ab4b23b2e4b577f28bb38a5cdaf4e?rik=oV4iTAagIbE2CA&pid=ImgRaw&r=0"
                            alt=""
                        />
                    </Images>
                </Content>
                <FeedList />
            </History>
        </Container>
    );
};

export default Personal;
