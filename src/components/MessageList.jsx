import React from "react";
import styled from "styled-components";

const MessageListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    height: calc(100% - 150px);
    overflow-y: auto;
`;

const MessageItem = styled.li`
    padding: 10px;
    display: flex;
    justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};

    & p {
        background-color: ${({ isUser }) => (isUser ? "#83B4FF" : "#fff")};
        padding: 10px;
        border-radius: 10px;
        max-width: 60%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }
`;

const MessageList = ({ messages }) => {
    return (
        <MessageListContainer>
            {messages.map((message, index) => (
                <MessageItem key={index} isUser={message.isUser}>
                    <p>{message.text}</p>
                </MessageItem>
            ))}
        </MessageListContainer>
    );
};

export default MessageList;
