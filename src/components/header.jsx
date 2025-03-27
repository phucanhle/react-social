import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

import FeatureList from "./FeatureList";
import logo from "../assets/logo.png";

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
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
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
    const user = useSelector((state) => state.auth.user);
    const [searchInput, setSearchInput] = useState(null);
    const { t } = useTranslation();

    const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
        setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    const handleInputSearch = (value) => {
        setSearchInput(value);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
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
                <SearchGroup>
                    <Input
                        type="search"
                        placeholder={t('common.search')}
                        onChange={(e) => handleInputSearch(e.target.value)}
                    />
                    {searchInput && (
                        <Result>
                            <Link to="/id">
                                <Items>
                                    <img
                                        src="https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain"
                                        alt=""
                                    />
                                    <p>Name</p>
                                </Items>
                            </Link>
                            <Link to="/id">
                                <Items>
                                    <img
                                        src="https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain"
                                        alt=""
                                    />
                                    <p>Name</p>
                                </Items>
                            </Link>
                            <Link to="/search" className="more">
                                {t('common.seeMore')}
                            </Link>
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
