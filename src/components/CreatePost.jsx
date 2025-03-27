import { useState, useCallback, memo } from "react";
import styled from "styled-components";
import upload from "../assets/image-upload.png";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postSlice";
import { useTranslation } from "../hooks/useTranslation";

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

const CreatePost = memo(({ user }) => {
    const { username, avatar } = user;
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { t, currentLanguage } = useTranslation();

    const handleFileInput = useCallback((e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const fileType = selectedFile.type;
        const isImage = fileType.startsWith('image/');
        const isVideo = fileType.startsWith('video/');

        if (!isImage && !isVideo) {
            setError(t('post.fileError'));
            setFile(null);
            return;
        }

        const maxSize = 50 * 1024 * 1024;
        if (selectedFile.size > maxSize) {
            setError(t('post.fileSizeError'));
            setFile(null);
            return;
        }

        setError("");
        setFile(selectedFile);
    }, [t]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!content.trim() && !file) return;

        setIsLoading(true);
        try {
            // TODO: Implement post creation logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            dispatch(addPost({
                id: Date.now(),
                user: {
                    username,
                    avatar
                },
                content,
                file: file ? URL.createObjectURL(file) : null,
                timestamp: new Date().toISOString()
            }));
            setContent("");
            setFile(null);
            setError("");
        } catch (error) {
            setError(t('post.postError'));
            console.error("Error creating post:", error);
        } finally {
            setIsLoading(false);
        }
    }, [content, file, username, avatar, dispatch, t]);

    const handleContentChange = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const handleFileRemove = useCallback(() => {
        setFile(null);
    }, []);

    return (
        <Container>
            <Title>{t('post.newPost')}</Title>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder={`${username}, ${t('post.whatOnMind')}`}
                    value={content}
                    onChange={handleContentChange}
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
                            <button 
                                type="button"
                                onClick={handleFileRemove}
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
                    {isLoading ? t('common.sending') : t('common.send')}
                </Button>
            </form>
        </Container>
    );
});

CreatePost.displayName = "CreatePost";

export default CreatePost;
