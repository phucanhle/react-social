import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Article = styled.article`
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5;
    padding: 20px;

    & .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0d7c66 0%, #0b6b56 100%);
        opacity: 0.1;
        z-index: -1;
    }
`;

const Form = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    & h3 {
        font-size: 24px;
        font-weight: 600;
        color: #1a1a1a;
        text-align: center;
        margin: 0 0 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        &::before {
            content: '';
            display: block;
            width: 4px;
            height: 24px;
            background-color: #0d7c66;
            border-radius: 2px;
        }
    }

    & .form-group {
        margin-bottom: 24px;

        & label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #1a1a1a;
            margin-bottom: 8px;
        }
    }

    & .links {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0 24px;
        
        
        & a {
           
            font-size: 14px;
            color: #0d7c66;
            text-decoration: none;
            transition: all 0.2s ease;
            margin-bottom: 16px;

            &:hover {
                color: #0b6b56;
                text-decoration: underline;
            }
        }
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #e4e6eb;
    font-size: 15px;
    color: #1a1a1a;
    background-color: #f0f2f5;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #0d7c66;
        background-color: white;
        box-shadow: 0 0 0 2px rgba(13, 124, 102, 0.1);
    }

    &::placeholder {
        color: #65676b;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 16px;

    ${props => props.primary ? `
        background-color: #0d7c66;
        color: white;
        border: none;

        &:hover {
            background-color: #0b6b56;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(13, 124, 102, 0.2);
        }

        &:active {
            transform: translateY(0);
        }
    ` : `
        background-color: transparent;
        color: #0d7c66;
        border: 1px solid #0d7c66;

        &:hover {
            background-color: #f0f2f5;
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }
    `}
`;

const HomePage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        setError("");
        const userData = { username, password };
        dispatch(login(userData));
        navigate("/");
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        setError("");
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
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <Input 
                            id="username"
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            autoComplete="off"
                        />
                    </div>
                    {error && (
                        <div style={{ 
                            color: "#dc2626", 
                            fontSize: "14px", 
                            marginBottom: "16px",
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}
                    <Button primary onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <div className="links">
                        <Link to="/forget">Quên mật khẩu?</Link>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsRegister(true);
                                setError("");
                            }}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </Form>
            ) : (
                <Form>
                    <h3>Đăng ký</h3>
                    <div className="form-group">
                        <label htmlFor="reg-username">Tên đăng nhập</label>
                        <Input 
                            id="reg-username"
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-password">Mật khẩu</label>
                        <Input
                            id="reg-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            autoComplete="off"
                        />
                    </div>
                    {error && (
                        <div style={{ 
                            color: "#dc2626", 
                            fontSize: "14px", 
                            marginBottom: "16px",
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}
                    <Button primary onClick={handleRegister}>
                        Đăng ký
                    </Button>
                    <div className="links">
                        <span></span>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsRegister(false);
                                setError("");
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </Form>
            )}
        </Article>
    );
};

export default HomePage;
