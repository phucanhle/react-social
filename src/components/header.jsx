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

const SearchGroup = styled.ul`
    display: flex;
    height: 100%;
    align-items: center;
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

const Input = styled.input`
    position: relative;
    width: 100%;
    padding: 5px 20px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid gray;
    font-family: var(--main-font);
    font-size: 16px;
`;
const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 1099);
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
                    <Input type="text" placeholder={`Tìm kiếm...`} autoComplete="off" />
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
                                    <FeatureList /> <label htmlFor="close"></label>
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
