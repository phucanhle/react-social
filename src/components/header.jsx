import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FeatureList from "./FeatureList";

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
    max-width: 1440px;
    padding: 10px 20px;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h1 {
        font-size: 20px;
        font-weight: 600;
    }
    & > img {
        height: 30px;
    }
`;

const Menu = styled.ul`
    display: flex;
    height: 100%;
    align-items: center;
    & li {
        margin: 0 10px;

        & a {
            color: var(--black);
            text-decoration: none;
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

const Header = ({ menu }) => {
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
                    <Link to="/">Logo</Link>
                </h1>
                <Menu>
                    {menu &&
                        menu.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.path}>{item.text}</Link>
                                </li>
                            );
                        })}
                </Menu>
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
