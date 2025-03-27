import styled from "styled-components";
import { Link } from "react-router-dom";
import { searchResults } from "../mockdata/searchData";

const Container = styled.div`
    padding: 80px 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #202124;
    margin-bottom: 24px;
`;

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
`;

const UserCard = styled(Link)`
    display: flex;
    align-items: center;
    padding: 16px;
    background: white;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid #e0e0e0;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const Avatar = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e0e0e0;
`;

const UserInfo = styled.div`
    margin-left: 16px;
`;

const UserName = styled.h2`
    font-size: 18px;
    color: #202124;
    margin: 0 0 4px 0;
`;

const UserBio = styled.p`
    font-size: 14px;
    color: #5f6368;
    margin: 0 0 8px 0;
`;

const Stats = styled.div`
    display: flex;
    gap: 16px;
    font-size: 13px;
    color: #5f6368;
`;

const Stat = styled.span`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const Search = () => {
    return (
        <Container>
            <Title>Kết quả tìm kiếm</Title>
            <ResultsGrid>
                {searchResults.map((user) => (
                    <UserCard key={user.id} to={`/user/${user.id}`}>
                        <Avatar src={user.avatar} alt={user.name} />
                        <UserInfo>
                            <UserName>{user.name}</UserName>
                            <UserBio>{user.bio}</UserBio>
                            <Stats>
                                <Stat>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.06 1.16.84 1.97 1.97 1.97 3.44V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                    </svg>
                                    {user.followers}
                                </Stat>
                                <Stat>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"/>
                                    </svg>
                                    {user.posts}
                                </Stat>
                            </Stats>
                        </UserInfo>
                    </UserCard>
                ))}
            </ResultsGrid>
        </Container>
    );
};

export default Search; 