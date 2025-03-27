import { useState, forwardRef, useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "../hooks/useTranslation";

const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    margin: 16px 0 0;
    padding: 16px 0 0;
    border-top: 1px solid #f0f2f5;

    & input {
        flex: 1;
        padding: 12px 16px;
        font-size: 14px;
        border: 1px solid #e4e6eb;
        border-radius: 20px;
        background-color: #f0f2f5;
        transition: all 0.2s ease;
        color: #1a1a1a;

        &:focus {
            outline: none;
            border-color: #0d7c66;
            background-color: white;
            box-shadow: 0 0 0 2px rgba(13, 124, 102, 0.1);
        }

        &::placeholder {
            color: #65676b;
        }
    }

    & button {
        padding: 8px 20px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 20px;
        background-color: #0d7c66;
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
            background-color: #0b6b56;
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }

        &:disabled {
            background-color: #e4e6eb;
            color: #65676b;
            cursor: not-allowed;
            transform: none;
        }
    }
`;

const Comment = forwardRef(({ onSubmit, onCancel }, ref) => {
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { t } = useTranslation();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!commentText.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setError("");

        try {
            await onSubmit(commentText);
            setCommentText("");
            if (onCancel) onCancel();
        } catch (error) {
            setError(t('comment.commentError'));
            console.error("Lỗi khi gửi bình luận:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [commentText, isSubmitting, onSubmit, onCancel, t]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }, [handleSubmit]);

    const handleCancel = useCallback(() => {
        setCommentText("");
        setError("");
        if (onCancel) onCancel();
    }, [onCancel]);

    return (
        <Container as="form" onSubmit={handleSubmit}>
            <input 
                ref={ref}
                type="text" 
                placeholder={t('comment.writeComment')}
                value={commentText}
                onChange={(e) => {
                    setCommentText(e.target.value);
                    setError("");
                }}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting}
            />
            <div style={{ display: "flex", gap: "8px" }}>
                <button 
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    style={{ 
                        backgroundColor: "#e4e6eb",
                        color: "#65676b"
                    }}
                >
                    {t('common.cancel')}
                </button>
                <button 
                    type="submit" 
                    disabled={!commentText.trim() || isSubmitting}
                >
                    <svg
                        className="w-5 h-5"
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                    {isSubmitting ? t('common.sending') : t('common.send')}
                </button>
            </div>
            {error && (
                <div style={{ 
                    color: "#dc2626", 
                    fontSize: "12px", 
                    marginTop: "4px",
                    width: "100%"
                }}>
                    {error}
                </div>
            )}
        </Container>
    );
});

Comment.displayName = "Comment";

export default Comment;
