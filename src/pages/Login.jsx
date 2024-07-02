import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Article = styled.article`
    min-height: 100vh;
    width: 100vw;

    & .background {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: -1;
    }

    display: flex;
    justify-content: center;
    align-items: center;
`;
const Form = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 30%;
    min-width: 320px;
    height: 50%;
    min-height: 370px;
    padding: 30px 20px;
    border-radius: 5px;

    background-color: white;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

    & h3 {
        font-size: 18px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        margin: 20px 0;
    }
    & div {
        width: 100%;
    }
    & label {
        color: #131313;
        font-size: 14px;
    }
    & a {
        font-size: 14px;
        color: #151515;
        margin: 10px 0 20px;
    }
`;
const Input = styled.input`
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #eee;

    font-family: var(--main-font);
    font-size: 16px;

    color: var(--navy);
`;
const Button = styled.button`
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #eee;

    font-family: var(--main-font);
    font-size: 16px;

    color: var(--white);
    background-color: var(--navy);

    cursor: pointer;

    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: var(--navy);
        color: var(--white);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    &[outline-data="true"] {
        color: var(--navy);
        background-color: var(--white);
        border: 1px solid var(--navy);
    }
`;

const HomePage = () => {
    const [isRegister, setIsRegister] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = { username, password };
        dispatch(login(userData));
        navigate("/");
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const userData = { username, password };

        console.log(userData);

        setIsRegister(false);
    };

    return (
        <Article>
            <div className="background"></div>
            {!isRegister ? (
                <Form>
                    <h3>Đăng nhập</h3>
                    <div>
                        <label htmlFor="">Username</label>
                        <Input type="text" value={username} onInput={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <Button onClick={handleLogin}>Đăng nhập</Button>
                    <Link to={"/forget"}>Quên mật khẩu?</Link>
                    <Button
                        outline-data="true"
                        type="reset"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsRegister(true);
                        }}
                    >
                        Đăng kí
                    </Button>
                </Form>
            ) : (
                <Form>
                    <h3>Đăng kí</h3>
                    <div>
                        <label htmlFor="">Username</label>
                        <Input type="text" value={username} onInput={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <Button onClick={handleRegister}>Đăng kí</Button>
                    <Button
                        outline-data="true"
                        type="reset"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsRegister(false);
                        }}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            )}
        </Article>
    );
};

export default HomePage;
