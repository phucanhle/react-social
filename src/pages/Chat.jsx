import styled from "styled-components";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import FriendList from "../components/FriendList";
import MessageList from "../components/MessageList";

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 80px 24px 24px;
    // background-color: #f0f2f5;
`;

const History = styled.div`
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 24px;
    height: calc(100vh - 104px);
 
    overflow: hidden;

    @media screen and (max-width: 820px) {
        grid-template-columns: 1fr;
        height: calc(100vh - 104px);
    }
`;

const Content = styled.div`
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ChatHeader = styled.div`
    width: 100%;
    padding: 20px 24px;
    border-bottom: 1px solid #f0f2f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
   

    & h2 {
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 12px;

        &::before {
            content: '';
            display: block;
            width: 4px;
            height: 18px;
            background-color: #0d7c66;
            border-radius: 2px;
        }
    }
`;

const ChatInputContainer = styled.div`
    display: flex;
    gap: 12px;
    padding: 20px 24px;
    border-top: 1px solid #f0f2f5;

`;

const ChatInput = styled.input`
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #e4e6eb;
    border-radius: 12px;
    font-size: 14px;
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

const SendButton = styled.button`
    padding: 12px 24px;
    background-color: #0d7c66;
    color: white;
    border: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: #0b6b56;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(13, 124, 102, 0.2);
    }

    &:active {
        transform: translateY(0);
    }

    & svg {
        width: 20px;
        height: 20px;
    }
`;

const ToggleFriendListButton = styled.button`
    display: none;
    padding: 8px 16px;
    background-color: #f0f2f5;
    color: #1a1a1a;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e4e6eb;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    @media screen and (max-width: 820px) {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;

const Overlay = styled.label`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 100;
`;

const userSelector = createSelector(
    (state) => state.auth.user,
    (user) => user,
);

const Chat = () => {
    const user = useSelector(userSelector);
    const location = useLocation();
    const [currentChatFriend, setCurrentChatFriend] = useState(location.state?.selectedFriend || null);
    const [messages, setMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const [isFriendListVisible, setIsFriendListVisible] = useState(window.innerWidth > 820);
    const [isTyping, setIsTyping] = useState(false);
    const [lastSeen, setLastSeen] = useState({});

    // Memoize handlers
    const handleSendMessage = useCallback(() => {
        if (newMessage.trim() !== "" && currentChatFriend) {
            const timestamp = new Date().toISOString();
            const friendMessages = messages[currentChatFriend.id] || [];
            const newMessageObj = {
                id: Date.now(),
                text: newMessage,
                isUser: true,
                timestamp,
                isRead: false
            };

            setMessages(prev => ({
                ...prev,
                [currentChatFriend.id]: [...friendMessages, newMessageObj],
            }));
            setNewMessage("");
            setIsTyping(false);
        }
    }, [newMessage, currentChatFriend, messages]);

    const handleFriendSelect = useCallback((friend) => {
        setCurrentChatFriend(friend);
        // Đánh dấu tin nhắn đã đọc khi chọn bạn bè
        if (messages[friend.id]) {
            setMessages(prev => ({
                ...prev,
                [friend.id]: prev[friend.id].map(msg => ({
                    ...msg,
                    isRead: true
                }))
            }));
        }
    }, [messages]);

    const handleTyping = useCallback(() => {
        setIsTyping(true);
        // Giả lập người dùng đang nhập
        setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    }, []);

    // Memoize current chat messages
    const currentChatMessages = useMemo(() => {
        return currentChatFriend ? messages[currentChatFriend.id] || [] : [];
    }, [currentChatFriend, messages]);

    // Update last seen
    useEffect(() => {
        if (currentChatFriend) {
            const interval = setInterval(() => {
                setLastSeen(prev => ({
                    ...prev,
                    [currentChatFriend.id]: new Date().toISOString()
                }));
            }, 30000); // Cập nhật mỗi 30 giây

            return () => clearInterval(interval);
        }
    }, [currentChatFriend]);

    // Handle window resize
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

    // Update currentChatFriend when location state changes
    useEffect(() => {
        if (location.state?.selectedFriend) {
            setCurrentChatFriend(location.state.selectedFriend);
            // Clear location state after setting currentChatFriend
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <Container>
            <History>
                <div style={{ 
                    display: isFriendListVisible ? "block" : "none",
                    borderRight: "1px solid #f0f2f5",
                    height: "100%",
                    overflow: "hidden"
                }}>
                    <FriendList 
                        onFriendSelect={handleFriendSelect}
                        lastSeen={lastSeen}
                    />
                </div>
                <Content>
                    {currentChatFriend ? (
                        <>
                            <ChatHeader>
                                <div>
                                    <h2>{currentChatFriend.name}</h2>
                                    <span style={{ 
                                        fontSize: "12px", 
                                        color: "#65676b",
                                        display: "block",
                                        marginTop: "4px"
                                    }}>
                                        {lastSeen[currentChatFriend.id] ? 
                                            `Hoạt động ${new Date(lastSeen[currentChatFriend.id]).toLocaleTimeString()}` : 
                                            "Đang offline"}
                                    </span>
                                </div>
                                <ToggleFriendListButton
                                    onClick={() => setIsFriendListVisible(!isFriendListVisible)}
                                >
                                    <svg
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
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                    {isFriendListVisible ? "Ẩn danh sách" : "Hiện danh sách"}
                                </ToggleFriendListButton>
                            </ChatHeader>
                            <MessageList 
                                messages={currentChatMessages}
                                isTyping={isTyping}
                            />
                            <ChatInputContainer>
                                <ChatInput
                                    type="text"
                                    placeholder="Nhập tin nhắn..."
                                    value={newMessage}
                                    onChange={(e) => {
                                        setNewMessage(e.target.value);
                                        handleTyping();
                                    }}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                />
                                <SendButton 
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                >
                                    <svg
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
                                    Gửi
                                </SendButton>
                            </ChatInputContainer>
                        </>
                    ) : (
                        <ChatHeader>
                            <h2>Chọn bạn bè để bắt đầu trò chuyện</h2>
                            <ToggleFriendListButton
                                onClick={() => setIsFriendListVisible(!isFriendListVisible)}
                            >
                                <svg
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
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                                {isFriendListVisible ? "Ẩn danh sách" : "Hiện danh sách"}
                            </ToggleFriendListButton>
                        </ChatHeader>
                    )}
                </Content>
            </History>
            {isFriendListVisible && window.innerWidth <= 820 && (
                <Overlay onClick={() => setIsFriendListVisible(false)} />
            )}
        </Container>
    );
};

export default React.memo(Chat);
