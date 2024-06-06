import { useState } from "react";
import styled from "styled-components";
import upload from "../assets/image-upload.png";
const Container = styled.div`
    width: 100%;
    background-color: white;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    border-radius: 12px;
`;
const FilePreview = styled.div`
    position: relative;
    width: 100%;
    & > img {
        width: 100%;
        border-radius: 15px;
        transition: all 1s ease;
    }
    & > button {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        padding: 5px;
        border: 0;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        &:hover {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
`;
const Title = styled.h1`
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 10px;
`;
const Input = styled.input`
    position: relative;
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #eee;
    font-family: var(--main-font);
    font-size: 16px;

    color: var(--navy);
    &[type="file"] {
        width: 32px;
        height: 32px;
        color: transparent;
        border: 0;
        margin: 0 10px;
        cursor: pointer;
        &::after {
            content: "";
            position: absolute;
            width: 32px;
            height: 32px;
            top: 0;
            left: 0;
            z-index: 1;
            color: black;
            background: url("${upload}");
            background-size: 32px;
            background-repeat: no-repeat;
            cursor: pointer;
            object-fit: cover;
        }
        &::-webkit-file-upload-button {
            display: none;
        }
    }
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
const Post = ({ user }) => {
    const { username } = user;
    const [file, setFile] = useState(null);

    const handleFileInput = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <Container>
            <Title>Đăng bài</Title>
            <form action="">
                <Input type="text" placeholder={`${username}, cập nhật trạng thái nào...`} />
                <Input type="file" onInput={handleFileInput} />
                <FilePreview>
                    {file && (
                        <>
                            <img src={URL.createObjectURL(file)} alt="Preview" />
                            <button type="reset" onClick={() => setFile(null)}>
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
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18 17.94 6M18 18 6.06 6"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </FilePreview>
                <Button>Post</Button>
            </form>
        </Container>
    );
};

export default Post;
