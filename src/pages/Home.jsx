import styled from "styled-components";
import FeatureList from "../components/FeatureList";
import FriendList from "../components/FriendList";
import FeedList from "../components/FeedList";

const Article = styled.article`
    min-height: calc(100vh - 50px);
    width: 100%;
    padding-top: 50px;

    display: grid;
    grid-template-columns: 25% 55% 20%;

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
    justify-content: center;
    @media screen and (max-width: 1098px) {
        display: none;
    }
`;

const MiddleDiv = styled.div`
    position: relative;
    padding: 20px;
`;

const RightDiv = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 898px) {
        display: none;
    }
`;

const HomePage = () => {
    return (
        <Article>
            <LeftDiv>
                <FeatureList />
            </LeftDiv>
            <MiddleDiv>
                <FeedList />
            </MiddleDiv>
            <RightDiv>
                <FriendList />
            </RightDiv>
        </Article>
    );
};

export default HomePage;
