import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "../hooks/useTranslation";

const MessageListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    height: calc(100% - 110px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 16px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #0d7c66;
        border-radius: 3px;
    }
`;

const MessageItem = styled.li`
    display: flex;
    justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const MessageContent = styled.div`
    max-width: 100%;
    padding: 12px 16px;
    border-radius: 16px;
    background-color: ${({ isUser }) => (isUser ? "#0d7c66" : "#f0f2f5")};
    color: ${({ isUser }) => (isUser ? "white" : "#1a1a1a")};
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    & .timestamp {
        font-size: 11px;
        opacity: 0.7;
        margin-top: 4px;
        text-align: right;
    }

    & .read-status {
        position: absolute;
        color: black;
        bottom: -15px;
        right: 16px;
        font-size: 10px;
        opacity: 0.7;
    }
`;

const TypingIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    background-color: #f0f2f5;
    border-radius: 16px;
    width: fit-content;
    margin-left: 16px;
    animation: slideIn 0.3s ease;

    & span {
        width: 8px;
        height: 8px;
        background-color: #0d7c66;
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;

        &:nth-child(1) { animation-delay: -0.32s; }
        &:nth-child(2) { animation-delay: -0.16s; }
    }

    @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }
`;

const MessageList = ({ messages, isTyping }) => {
    const messagesEndRef = useRef(null);
    const { t } = useTranslation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <MessageListContainer>
            {messages.map((message) => (
                <MessageItem key={message.id} isUser={message.isUser}>
                    <MessageContent isUser={message.isUser}>
                        {message.text}
                        <div className="timestamp">
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </div>
                        {message.isUser && (
                            <div className="read-status">
                                {message.isRead ? t('common.read') : t('common.sent')}
                            </div>
                        )}
                    </MessageContent>
                </MessageItem>
            ))}
            {isTyping && (
                <MessageItem isUser={false}>
                    <TypingIndicator>
                        <span></span>
                        <span></span>
                        <span></span>
                    </TypingIndicator>
                </MessageItem>
            )}
            <div ref={messagesEndRef} />
        </MessageListContainer>
    );
};

export default React.memo(MessageList);
