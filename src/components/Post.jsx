import { useState } from "react";
import styled from "styled-components";
import upload from "../assets/image-upload.png";

const PostWrapper = styled.div`
    width: 100%;
    background-color: white;
    padding: 28px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    margin-bottom: 28px;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const UserAvatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #f0f2f5;
    margin-right: 16px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const PostTitle = styled.h2`
    font-size: 22px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
`;

const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const PostInput = styled.div`
    position: relative;
    width: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 120px;
    padding: 16px;
    border: 2px solid #f0f2f5;
    border-radius: 12px;
    font-family: var(--main-font);
    font-size: 16px;
    color: #1a1a1a;
    resize: none;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--navy);
        box-shadow: 0 0 0 3px rgba(0, 0, 128, 0.1);
    }

    &::placeholder {
        color: #65676b;
    }
`;

const FilePreview = styled.div`
    position: relative;
    width: 100%;
    margin: 8px 0;
    border-radius: 12px;
    overflow: hidden;
    
    & > img {
        width: 100%;
        border-radius: 12px;
        transition: all 0.3s ease;
        max-height: 500px;
        object-fit: cover;
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
    }
`;

const FileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background-color: #f0f2f5;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;

    &:hover {
        background-color: #e4e6eb;
    }

    &::before {
        content: "";
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        background: url("${upload}");
        background-size: contain;
        background-repeat: no-repeat;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
`;

const PostButton = styled.button`
    flex: 1;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    font-family: var(--main-font);
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: var(--navy);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #000080;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 128, 0.2);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const CreatePost = ({ user }) => {
    const { username, avatar } = user;
    const [file, setFile] = useState(null);
    const [content, setContent] = useState("");

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic đăng bài ở đây
        console.log({ content, file });
    };

    return (
        <PostWrapper>
            <PostHeader>
                <UserAvatar>
                    {avatar && <img src={avatar} alt={username} />}
                </UserAvatar>
                <PostTitle>Tạo bài đăng mới</PostTitle>
            </PostHeader>
            <PostForm onSubmit={handleSubmit}>
                <PostInput>
                    <TextArea
                        placeholder={`${username}, bạn đang nghĩ gì?`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </PostInput>
                <FileInputLabel>
                    Thêm ảnh
                    <FileInput
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                    />
                </FileInputLabel>
                <FilePreview>
                    {file && (
                        <>
                            <img src={URL.createObjectURL(file)} alt="Preview" />
                            <RemoveButton type="button" onClick={() => setFile(null)}>
                                <svg
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
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
                            </RemoveButton>
                        </>
                    )}
                </FilePreview>
                <ActionButtons>
                    <PostButton type="submit" disabled={!content.trim() && !file}>
                        Đăng bài
                    </PostButton>
                </ActionButtons>
            </PostForm>
        </PostWrapper>
    );
};

export default CreatePost;
