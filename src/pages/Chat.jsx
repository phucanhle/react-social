import styled from "styled-components";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import React, { useState, useEffect } from "react";
import FriendList from "../components/FriendList";
import MessageList from "../components/MessageList"; // Import MessageList

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
    padding: 50px 0 0;
`;

const History = styled.div`
    display: grid;
    padding: 5px;
    grid-template-columns: 1fr 4fr;
    gap: 20px;
    @media screen and (max-width: 820px) {
        grid-template-columns: 1fr;
    }
`;

const Content = styled.div`
    height: 100%;
    min-height: calc(100vh - 90px);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: white;
`;

const ChatHeader = styled.div`
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ChatInputContainer = styled.div`
    display: flex;
    border-top: 1px solid #eee;
    padding: 20px 10px;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-right: 10px;
    outline: none;
    font-size: 14px;
    font-family: inherit;
`;

const SendButton = styled.button`
    padding: 10px 30px;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 14px;
    font-family: inherit;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ToggleFriendListButton = styled.button`
    display: none;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
        background-color: #0056b3;
    }

    @media screen and (max-width: 820px) {
        display: block;
    }
`;
const Overlay = styled.label`
    position: fixed;
    width: 370px;
    height: 100vh;
    background: #f0f2f5;
    border-radius: 10px;
`;

const userSelector = createSelector(
    (state) => state.auth.user,
    (user) => user,
);

const Chat = () => {
    const user = useSelector(userSelector);
    const [currentChatFriend, setCurrentChatFriend] = useState(null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const [isFriendListVisible, setIsFriendListVisible] = useState(true);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "" && currentChatFriend) {
            const friendMessages = messages[currentChatFriend.id] || [];
            setMessages({
                ...messages,
                [currentChatFriend.id]: [...friendMessages, { text: newMessage, isUser: true }],
            });
            setNewMessage("");
        }
    };

    const handleFriendSelect = (friend) => {
        setCurrentChatFriend(friend);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 820) {
                setIsFriendListVisible(true);
            } else {
                setIsFriendListVisible(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Container>
            <History>
                <div style={{ display: isFriendListVisible ? "block" : "none" }}>
                    <FriendList onFriendSelect={handleFriendSelect} />
                    <Overlay htmlFor="toggle"></Overlay>
                </div>
                <Content>
                    {currentChatFriend ? (
                        <>
                            <ChatHeader>
                                <h2>{currentChatFriend.name}</h2>
                                <ToggleFriendListButton
                                    aria-label={isFriendListVisible ? "Hide Friends" : "Show Friends"}
                                    onClick={() => setIsFriendListVisible(!isFriendListVisible)}
                                >
                                    {isFriendListVisible ? "Hide Friends" : "Show Friends"}
                                </ToggleFriendListButton>
                            </ChatHeader>
                            <MessageList messages={messages[currentChatFriend.id] || []} />
                            <ChatInputContainer>
                                <ChatInput
                                    type="text"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                />
                                <SendButton onClick={handleSendMessage} aria-label="Send message">
                                    Send
                                </SendButton>
                            </ChatInputContainer>
                        </>
                    ) : (
                        <ChatHeader>
                            <p>Please select a friend to start chatting.</p>
                            <ToggleFriendListButton
                                id="toggle"
                                aria-label={isFriendListVisible ? "Hide Friends" : "Show Friends"}
                                onClick={() => setIsFriendListVisible(!isFriendListVisible)}
                            >
                                {isFriendListVisible ? "Hide Friends" : "Show Friends"}
                            </ToggleFriendListButton>
                        </ChatHeader>
                    )}
                </Content>
            </History>
        </Container>
    );
};

export default Chat;
