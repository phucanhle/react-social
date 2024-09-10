import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FeatureList from "./FeatureList";
import logo from "../assets/logo.png";

const Container = styled.header`
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
`;
const Content = styled.div`
    position: relative;
    width: 100%;
    max-width: 1750px;
    padding: 10px 20px;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h1 {
        font-size: 20px;
        font-weight: 600;
        & a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #005c78;
            &:active {
                color: #005c00;
                & img {
                    transform: rotate(20deg);
                }
            }
            & img {
                height: 48px;
                margin-right: 10px;
            }
        }
    }
`;

const HiddenFeature = styled.div`
    position: absolute;
    right: 300px;
    top: 50px;

    & label {
        position: fixed;
        top: 0;
        right: -100vw;
        width: 1000vw;
        height: 1000vh;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: -1;
    }
`;
const Button = styled.button`
    border: 0;
    background: transparent;
    width: 48px;
    aspect-ratio: 1/1;
    border-radius: 100px;
    cursor: pointer;
    &:hover {
        background-color: var(--white);
    }
`;
const SearchGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
`;

const Input = styled.input`
    position: relative;
    width: 100%;
    padding: 2px 20px;
    border-radius: 5px;
    border: 1px solid gray;
    font-family: var(--main-font);
    font-size: 16px;
`;

const Result = styled.div`
    width: 240px;
    position: absolute;
    top: 55px;
    border-radius: 10px;
    background-color: #f8f9fa;
    padding: 10px;
    text-align: center;
    & a {
        width: 100%;
        font-size: 14px;
        text-decoration: none;
        &.more {
            display: block;
            margin-top: 10px;
        }
    }
`;

const Items = styled.div`
    width: 100%;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    & img {
        width: 40px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50px;
    }
    & p {
        font-size: 14px;
        font-weight: 500;
        margin: 0 10px;
    }
    &:hover {
        background-color: #00000010;
    }
`;
const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const [searchInput, setSearchInput] = useState(null);
    const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 1099);
    };

    const handleInputSearch = (value) => {
        console.log(value);
        setSearchInput(value);
    };

    useEffect(() => {
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);
    if (!user) return "";

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
                        placeholder={`Tìm kiếm...`}
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
                                Xem thêm
                            </Link>
                        </Result>
                    )}
                </SearchGroup>
                {isMobile ? (
                    <>
                        <Button
                            id="close"
                            onClick={() => {
                                setIsOpenMenu(!isOpenMenu);
                            }}
                        >
                            <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="M5 7h14M5 12h14M5 17h14"
                                />
                            </svg>
                        </Button>
                        <HiddenFeature>
                            {isOpenMenu ? (
                                <>
                                    <FeatureList />{" "}
                                    <label htmlFor="close"></label>
                                </>
                            ) : (
                                ""
                            )}
                        </HiddenFeature>
                    </>
                ) : (
                    ""
                )}
            </Content>
        </Container>
    );
};

export default Header;
