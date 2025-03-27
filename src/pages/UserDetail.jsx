import styled from "styled-components";
import { useParams } from "react-router-dom";
import { userDetail } from "../mockdata/searchData";

const Container = styled.div`
    padding: 80px 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const ProfileHeader = styled.div`
    background: white;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 24px;
    border: 1px solid #e0e0e0;
    display: flex;
    gap: 32px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const Avatar = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e0e0e0;
`;

const ProfileInfo = styled.div`
    flex: 1;
`;

const Name = styled.h1`
    font-size: 28px;
    color: #202124;
    margin: 0 0 8px 0;
`;

const Bio = styled.p`
    font-size: 16px;
    color: #5f6368;
    margin: 0 0 16px 0;
`;

const Stats = styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
`;

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatValue = styled.span`
    font-size: 20px;
    font-weight: 600;
    color: #202124;
`;

const StatLabel = styled.span`
    font-size: 14px;
    color: #5f6368;
`;

const Details = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 24px;
`;

const DetailItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #5f6368;
    
    svg {
        width: 20px;
        height: 20px;
    }
`;

const PostsSection = styled.div`
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e0e0e0;
`;

const PostsTitle = styled.h2`
    font-size: 20px;
    color: #202124;
    margin: 0 0 24px 0;
`;

const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Post = styled.div`
    padding: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const PostContent = styled.p`
    font-size: 16px;
    color: #202124;
    margin: 0 0 12px 0;
`;

const PostMeta = styled.div`
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: #5f6368;
`;

const UserDetail = () => {
    const { id } = useParams();
    
    return (
        <Container>
            <ProfileHeader>
                <Avatar src={userDetail.avatar} alt={userDetail.name} />
                <ProfileInfo>
                    <Name>{userDetail.name}</Name>
                    <Bio>{userDetail.bio}</Bio>
                    <Stats>
                        <Stat>
                            <StatValue>{userDetail.followers}</StatValue>
                            <StatLabel>Người theo dõi</StatLabel>
                        </Stat>
                        <Stat>
                            <StatValue>{userDetail.posts}</StatValue>
                            <StatLabel>Bài viết</StatLabel>
                        </Stat>
                    </Stats>
                    <Details>
                        <DetailItem>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            {userDetail.location}
                        </DetailItem>
                        <DetailItem>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            Tham gia {new Date(userDetail.joinedDate).toLocaleDateString('vi-VN')}
                        </DetailItem>
                        <DetailItem>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.49L5.76 4.6l.34-.1h12.82l.34.1L21 8.49V13zm-1 7V8.97l-6-5.4-6 5.4V20h12zM9 9h6v6H9V9z"/>
                            </svg>
                            <a href={userDetail.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                {userDetail.website}
                            </a>
                        </DetailItem>
                    </Details>
                </ProfileInfo>
            </ProfileHeader>
            
            <PostsSection>
                <PostsTitle>Bài viết gần đây</PostsTitle>
                <PostList>
                    {userDetail.recentPosts.map((post) => (
                        <Post key={post.id}>
                            <PostContent>{post.content}</PostContent>
                            <PostMeta>
                                <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                                <span>❤️ {post.likes}</span>
                                <span>💬 {post.comments}</span>
                            </PostMeta>
                        </Post>
                    ))}
                </PostList>
            </PostsSection>
        </Container>
    );
};

export default UserDetail; 