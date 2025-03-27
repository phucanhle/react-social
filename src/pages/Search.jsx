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

const SearchBar = styled.div`
    position: relative;
    margin-bottom: 24px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
    padding-left: 45px;
    border: 1px solid #e4e6eb;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #0d7c66;
        box-shadow: 0 0 0 2px rgba(13, 124, 102, 0.1);
    }
`;

const SearchIcon = styled.svg`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #65676b;
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

const ResultList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ResultItem = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e4e6eb;
    margin-right: 16px;
`;

const Content = styled.div`
    flex: 1;
`;

const Name = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 4px;
`;

const Description = styled.p`
    font-size: 14px;
    color: #65676b;
`;

const Search = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data - thay thế bằng dữ liệu thực từ API
    const searchResults = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            description: "Lập trình viên"
        },
        {
            id: 2,
            name: "Trần Thị B",
            description: "Nhà thiết kế"
        },
        {
            id: 3,
            name: "Lê Văn C",
            description: "Quản lý dự án"
        }
    ];

    return (
        <Container>
            <Title>{t('menu.search')}</Title>
            <SearchBar>
                <SearchIcon
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                </SearchIcon>
                <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </SearchBar>
            <Tabs>
                <Tab 
                    active={activeTab === 'all'} 
                    onClick={() => setActiveTab('all')}
                >
                    Tất cả
                </Tab>
                <Tab 
                    active={activeTab === 'users'} 
                    onClick={() => setActiveTab('users')}
                >
                    Người dùng
                </Tab>
                <Tab 
                    active={activeTab === 'posts'} 
                    onClick={() => setActiveTab('posts')}
                >
                    Bài viết
                </Tab>
            </Tabs>
            <ResultList>
                {searchResults.map((result) => (
                    <ResultItem key={result.id}>
                        <Avatar />
                        <Content>
                            <Name>{result.name}</Name>
                            <Description>{result.description}</Description>
                        </Content>
                    </ResultItem>
                ))}
            </ResultList>
        </Container>
    );
};

export default Search; 