import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

const Container = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #1a1a1a;
`;

const Tabs = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    border-bottom: 1px solid #e4e6eb;
    padding-bottom: 12px;
`;

const Tab = styled.button`
    padding: 8px 16px;
    border: none;
    background: none;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.active ? '#0d7c66' : '#65676b'};
    cursor: pointer;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        bottom: -13px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${props => props.active ? '#0d7c66' : 'transparent'};
    }

    &:hover {
        color: #0d7c66;
    }
`;

const FriendList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;

const FriendCard = styled.div`
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const Avatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #e4e6eb;
    margin: 0 auto 12px;
`;

const Name = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
`;

const Status = styled.span`
    font-size: 13px;
    color: #65676b;
`;

const Friends = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('all');

    // Mock data - thay thế bằng dữ liệu thực từ API
    const friends = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            status: "Đang online"
        },
        {
            id: 2,
            name: "Trần Thị B",
            status: "Đang offline"
        },
        {
            id: 3,
            name: "Lê Văn C",
            status: "Đang online"
        }
    ];

    return (
        <Container>
            <Title>{t('menu.friends')}</Title>
            <Tabs>
                <Tab 
                    active={activeTab === 'all'} 
                    onClick={() => setActiveTab('all')}
                >
                    Tất cả
                </Tab>
                <Tab 
                    active={activeTab === 'online'} 
                    onClick={() => setActiveTab('online')}
                >
                    Đang online
                </Tab>
                <Tab 
                    active={activeTab === 'offline'} 
                    onClick={() => setActiveTab('offline')}
                >
                    Đang offline
                </Tab>
            </Tabs>
            <FriendList>
                {friends.map((friend) => (
                    <FriendCard key={friend.id}>
                        <Avatar />
                        <Name>{friend.name}</Name>
                        <Status>{friend.status}</Status>
                    </FriendCard>
                ))}
            </FriendList>
        </Container>
    );
};

export default Friends; 