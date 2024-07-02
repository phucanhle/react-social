import styled from "styled-components";
import React, { memo } from "react";

const Container = styled.div`
    background-color: white;
    color: var(--black);
    position: fixed;
    z-index: 2;
    width: 100%;
    max-width: 250px;
    border-radius: 12px;
    padding: 20px 0;
    height: calc(100vh - 50px - 40px);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin: 0 10px;

    & h3 {
        color: inherit;
        font-size: 20px;
        font-weight: 600;
        margin: 0 20px 10px;
    }
`;
const List = styled.ul`
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 140px);
    padding: 0 10px;

    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }
`;
const ItemContainer = styled.li`
    width: 100%;
    margin: 10px 0;
    padding: 5px 0;
    border-radius: 12px;

    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: var(--white);
    }
    & img {
        position: relative;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        width: 50px;
        border-radius: 100px;
    }

    & p {
        margin: 5px 10px;
    }

    &:after {
        background-color: green;
        content: " ";
        width: 10px;
        height: 10px;
        position: absolute;
        z-index: 999;
        top: 10px;
        right: 10px;
        border-radius: 50%;
    }
`;

const FriendList = ({ onFriendSelect }) => {
    const listFriend = [
        { id: 1, avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain", name: "Alice" },
        { id: 2, avatar: "https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg", name: "Bob" },
        { id: 3, avatar: "https://th.bing.com/th/id/OIP.Rl_57rLauBKG-iTsWL6SuwHaHn?rs=1&pid=ImgDetMain", name: "Charlie" },
        { id: 4, avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain", name: "Alice" },
        { id: 5, avatar: "https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg", name: "Bob" },
        { id: 6, avatar: "https://th.bing.com/th/id/OIP.Rl_57rLauBKG-iTsWL6SuwHaHn?rs=1&pid=ImgDetMain", name: "Charlie" },
        { id: 7, avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain", name: "Alice" },
        { id: 8, avatar: "https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg", name: "Bob" },
        { id: 9, avatar: "https://th.bing.com/th/id/OIP.Rl_57rLauBKG-iTsWL6SuwHaHn?rs=1&pid=ImgDetMain", name: "Charlie" },
        { id: 10, avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain", name: "Alice" },
        { id: 11, avatar: "https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg", name: "Bob" },
        { id: 12, avatar: "https://th.bing.com/th/id/OIP.Rl_57rLauBKG-iTsWL6SuwHaHn?rs=1&pid=ImgDetMain", name: "Charlie" },
        { id: 13, avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain", name: "Alice" },
        { id: 14, avatar: "https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg", name: "Bob" },
        { id: 15, avatar: "https://th.bing.com/th/id/OIP.Rl_57rLauBKG-iTsWL6SuwHaHn?rs=1&pid=ImgDetMain", name: "Charlie" },
        { id: 16, avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain", name: "Alice" },
        { id: 17, avatar: "https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg", name: "Bob" },
        { id: 18, avatar: "https://th.bing.com/th/id/OIP.Rl_57rLauBKG-iTsWL6SuwHaHn?rs=1&pid=ImgDetMain", name: "Charlie" },
    ];
    
    return (
        <Container>
            <h3>Bạn bè ({listFriend.length})</h3>
            <List>
                {listFriend.map((item, index) => (
                    <ItemContainer key={index} onClick={() => onFriendSelect(item)}>
                        <img src={item.avatar} alt={`avatar-of-${item.name}`} />
                        <p>{item.name}</p>
                    </ItemContainer>
                ))}
            </List>
        </Container>
    );
};

export default memo(FriendList);
