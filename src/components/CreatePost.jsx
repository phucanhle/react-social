import { useState } from "react";
import styled from "styled-components";
import upload from "../assets/image-upload.png";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postSlice";

const Container = styled.div`
    width: 100%;
    background-color: white;
    padding: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 16px;
    transition: all 0.3s ease;
    &:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
`;

const FilePreview = styled.div`
    position: relative;
    width: 100%;
    margin: 16px 0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    & > img, & > video {
        width: 100%;
        border-radius: 16px;
        transition: all 0.3s ease;
        &:hover {
            transform: scale(1.02);
        }
    }
    
    & > button {
        position: absolute;
        top: 16px;
        right: 16px;
        color: white;
        padding: 8px;
        border: 0;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
            transform: scale(1.1);
        }
    }
`;

const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
        content: '';
        display: block;
        width: 4px;
        height: 20px;
        background-color: var(--navy);
        border-radius: 2px;
    }
`;

const Input = styled.input`
    position: relative;
    width: 100%;
    padding: 12px 16px;
    margin: 8px 0;
    border-radius: 12px;
    border: 2px solid #eee;
    font-family: var(--main-font);
    font-size: 16px;
    color: var(--navy);
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: var(--navy);
        box-shadow: 0 0 0 3px rgba(0, 0, 128, 0.1);
    }
    
    &::placeholder {
        color: #999;
    }

    &[type="file"] {
        width: 40px;
        height: 40px;
        color: transparent;
        border: 0;
        margin: 0;
        cursor: pointer;
        padding: 0;
        
        &::after {
            content: "";
            position: absolute;
            width: 40px;
            height: 40px;
            top: 0;
            left: 0;
            z-index: 1;
            color: black;
            background: url("${upload}");
            background-size: 40px;
            background-repeat: no-repeat;
            cursor: pointer;
            object-fit: cover;
            transition: all 0.2s ease;
            
            &:hover {
                transform: scale(1.1);
            }
        }
        
        &::-webkit-file-upload-button {
            display: none;
        }
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px 24px;
    margin: 16px 0 0;
    border-radius: 12px;
    border: none;
    font-family: var(--main-font);
    font-size: 16px;
    font-weight: 600;
    color: var(--white);
    background-color: var(--navy);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 128, 0.2);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
    }

    &:hover:not(:disabled)::after {
        width: 300px;
        height: 300px;
    }
`;

const ErrorMessage = styled.div`
    color: #dc2626;
    background-color: #fee2e2;
    padding: 12px 16px;
    border-radius: 8px;
    margin: 8px 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
        content: '⚠️';
    }
`;

const CreatePost = ({ user }) => {
    const { username, avatar } = user;
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const fileType = selectedFile.type;
        const isImage = fileType.startsWith('image/');
        const isVideo = fileType.startsWith('video/');

        if (!isImage && !isVideo) {
            setError("Chỉ cho phép upload hình ảnh hoặc video!");
            setFile(null);
            return;
        }

        const maxSize = 50 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
            setError("File không được vượt quá 50MB!");
            setFile(null);
            return;
        }

        setError("");
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !file) {
            setError("Vui lòng nhập nội dung hoặc chọn file!");
            return;
        }

        setIsLoading(true);
        try {
            // Tạo URL cho file preview
            const fileUrl = file ? URL.createObjectURL(file) : null;
            
            // Tạo post mới
            const newPost = {
                postid: Date.now(), // Tạm thời dùng timestamp làm id
                user: {
                    name: username,
                    avatar: avatar
                },
                content: content.trim(),
                imgSrc: fileUrl ? [fileUrl] : [],
                createdAt: new Date().toISOString(),
                likes: 0,
                comments: []
            };

            // Thêm post vào Redux store
            dispatch(addPost(newPost));

            // Reset form
            setContent("");
            setFile(null);
            setError("");
        } catch (err) {
            setError("Có lỗi xảy ra khi đăng bài!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Title>Đăng bài</Title>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder={`${username}, cập nhật trạng thái nào...`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={isLoading}
                />
                <Input 
                    type="file" 
                    onInput={handleFileInput}
                    accept="image/*,video/*"
                    disabled={isLoading}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <FilePreview>
                    {file && (
                        <>
                            {file.type.startsWith('image/') ? (
                                <img src={URL.createObjectURL(file)} alt="Preview" />
                            ) : (
                                <video 
                                    src={URL.createObjectURL(file)} 
                                    controls 
                                />
                            )}
                            <button type="button" onClick={() => setFile(null)}>
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
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang đăng..." : "Đăng bài"}
                </Button>
            </form>
        </Container>
    );
};

export default CreatePost;
