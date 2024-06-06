import styled from "styled-components";

const Article = styled.article`
    min-height: calc(100vh - 50px);
    background-color: var(--red);
`;

const HomePage = () => {
    return <Article></Article>;
};

export default HomePage;
