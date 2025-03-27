import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { friendList } from "../mockdata/friendData";

import FeatureList from "./FeatureList";
import logo from "../assets/logo.png";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Container = styled.header`
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    max-width: 1440px;
    padding: 0 24px;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h1 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
        
        & a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #0d7c66;
            transition: all 0.3s ease;
            
            &:hover {
                color: #0b6b56;
                transform: translateY(-1px);
                
                & img {
                    transform: rotate(10deg) scale(1.05);
                }
            }
            
            &:active {
                transform: translateY(0);
            }
            
            & img {
                height: 40px;
                margin-right: 12px;
                transition: all 0.3s ease;
            }
            
            & p {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
                letter-spacing: -0.5px;
            }
        }
    }
`;

const SearchGroup = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 24px;

    @media screen and (max-width: 768px) {
        max-width: 300px;
        margin: 0 12px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
    padding-left: 48px;
    border-radius: 12px;
    border: 1px solid #e4e6eb;
    font-size: 14px;
    color: #1a1a1a;
    background-color: #f0f2f5;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #0d7c66;
        background-color: white;
        box-shadow: 0 0 0 3px rgba(13, 124, 102, 0.1);
    }

    &::placeholder {
        color: #65676b;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #65676b;
    pointer-events: none;
    transition: all 0.3s ease;

    ${Input}:focus + & {
        color: #0d7c66;
    }
`;

const Result = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 8px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    z-index: 1000;
    border: 1px solid rgba(0, 0, 0, 0.05);
    animation: ${fadeIn} 0.2s ease-out;
    max-height: 400px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f0f2f5;
    }

    &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }

    & a {
        text-decoration: none;
        color: inherit;
        
        &.more {
            display: block;
            padding: 12px 16px;
            text-align: center;
            color: #0d7c66;
            font-weight: 500;
            border-top: 1px solid #f0f2f5;
            transition: all 0.2s ease;
            
            &:hover {
                background-color: #f0f2f5;
            }
        }
    }
`;

const LoadingSpinner = styled.div`
    width: 24px;
    height: 24px;
    border: 3px solid #f0f2f5;
    border-top: 3px solid #0d7c66;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);

    @keyframes spin {
        0% { transform: translateY(-50%) rotate(0deg); }
        100% { transform: translateY(-50%) rotate(360deg); }
    }
`;

const NoResult = styled.div`
    padding: 24px;
    text-align: center;
    color: #65676b;
    font-size: 14px;
`;

const Items = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    & img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #f0f2f5;
        transition: all 0.2s ease;
    }
    
    & p {
        margin: 0 12px;
        font-size: 14px;
        font-weight: 500;
        color: #1a1a1a;
    }
    
    &:hover {
        background-color: #f0f2f5;
        
        & img {
            transform: scale(1.05);
            border-color: #0d7c66;
        }
    }
`;

const Button = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #f0f2f5;
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    & svg {
        width: 24px;
        height: 24px;
        color: #1a1a1a;
    }
`;

const HiddenFeature = styled.div`
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 9999;
    display: ${props => props.isOpen ? 'block' : 'none'};
    
    & label {
        position: fixed;
        top: 0;
        right: -100vw;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
        z-index: -1;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const TabletFeatureButton = styled.button`
    display: none;
    padding: 8px 16px;
    background-color: #f0f2f5;
    color: #1a1a1a;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: #e4e6eb;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    @media screen and (min-width: 769px) and (max-width: 1024px) {
        display: flex;
    }
`;

const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const { t } = useTranslation();

    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
        setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    const handleInputSearch = async (value) => {
        setSearchInput(value);
        setIsLoading(true);
        
        try {
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Lọc kết quả tìm kiếm từ danh sách bạn bè
            const filteredResults = friendList.filter(friend => 
                friend.name.toLowerCase().includes(value.toLowerCase())
            );
            
            setSearchResults(filteredResults);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchInput("");
                setSearchResults([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    if (!user) return null;

    return (
        <Container>
            <Content>
                <h1>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                        <p>Hollow Knight</p>
                    </Link>
                </h1>
                <SearchGroup ref={searchRef}>
                    <Input
                        type="search"
                        placeholder={t('common.search')}
                        value={searchInput}
                        onChange={(e) => handleInputSearch(e.target.value)}
                    />
                    <SearchIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </SearchIcon>
                    {isLoading && <LoadingSpinner />}
                    {searchInput && (
                        <Result>
                            {searchResults.length > 0 ? (
                                <>
                                    {searchResults.map(result => (
                                        <Link key={result.id} to={`/user/${result.id}`}>
                                            <Items>
                                                <img src={result.avatar} alt={result.name} />
                                                <p>{result.name}</p>
                                            </Items>
                                        </Link>
                                    ))}
                                    <Link to="/search" className="more">
                                        {t('common.seeMore')}
                                    </Link>
                                </>
                            ) : (
                                <NoResult>{t('common.noResults')}</NoResult>
                            )}
                        </Result>
                    )}
                </SearchGroup>
                {isMobile && (
                    <>
                        <Button onClick={handleToggleMenu}>
                            <svg
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
                                    d="M5 7h14M5 12h14M5 17h14"
                                />
                            </svg>
                        </Button>
                        <HiddenFeature isOpen={isOpenMenu}>
                            <FeatureList />
                            <label onClick={() => setIsOpenMenu(false)} />
                        </HiddenFeature>
                    </>
                )}
                {isTablet && (
                    <>
                        <TabletFeatureButton onClick={handleToggleMenu}>
                            <svg
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
                                    d="M5 7h14M5 12h14M5 17h14"
                                />
                            </svg>
                            {t('common.menu')}
                        </TabletFeatureButton>
                        <HiddenFeature isOpen={isOpenMenu}>
                            <FeatureList />
                            <label onClick={() => setIsOpenMenu(false)} />
                        </HiddenFeature>
                    </>
                )}
            </Content>
        </Container>
    );
};

export default Header;
