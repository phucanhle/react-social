import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
    padding: 20px;
    border-radius: 10px;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    gap: 20px;

    @media screen and (max-width: 481px) {
        flex-direction: column;
    }
`;
const Title = styled.h3`
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
`;
const Content = styled.p`
    line-height: 1.4;
`;
const Banner = styled.img`
    width: 200px;
    border-radius: 10px;
    @media screen and (max-width: 481px) {
        width: 100%;
    }
`;

const Movie = ({ movie }) => {
    const { banner, title, summary } = movie;
    return (
        <Container>
            <Banner src={banner} alt={`banner-cua-${title}`} />
            <div>
                <Title>{title}</Title>
                <Content>{summary}</Content>
            </div>
        </Container>
    );
};

export default Movie;
