import styled from "styled-components";
import React, { memo } from "react";

const Container = styled.div`
  position: fixed;
  max-height: calc(100vh - 50px - 40px);
  width: 100%;
  max-width: 340px;
  border-radius: 12px;
  padding: 20px 0;
  margin: 0 10px;
  z-index: 2;

  & h3 {
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
  padding: 5px 10px;
  border-radius: 12px;

  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e4e6e9;
  }
  & img {
    position: relative;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    width: 40px;
    border-radius: 100px;
  }

  & p {
    font-size: 14px;
    font-weight: 500;
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
    {
      id: 1,
      avatar:
        "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725580800&semt=ais_hybrid",
      name: "David",
    },
    {
      id: 2,
      avatar:
        "https://www.shutterstock.com/image-photo/smiling-cheerful-young-adult-african-600nw-1850821510.jpg",
      name: "Grace",
    },
    {
      id: 3,
      avatar:
        "https://cdn.pixabay.com/photo/2021/06/04/10/28/portrait-6309448_1280.jpg",
      name: "Frank",
    },
    {
      id: 4,
      avatar:
        "https://media.istockphoto.com/id/1369508766/photo/beautiful-successful-latin-woman-smiling.jpg?s=612x612&w=0&k=20&c=LoznG6eGT42_rs9G1dOLumOTlAveLpuOi_U755l_fqI=",
      name: "Eva",
    },
    {
      id: 5,
      avatar:
        "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
      name: "Henry",
    },
    {
      id: 6,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6ulsxkO3-I7dHKu72hCdugh05b0VLaHcKw&s",
      name: "Isabella",
    },
    {
      id: 7,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAlLasNECygcPJv66hzob9fQOsmqwfAIGOg&s",
      name: "Jack",
    },
    {
      id: 8,
      avatar:
        "https://img.freepik.com/premium-photo/natural-real-person-portrait-closeup-woman-girl-female-outside-nature-forest-artistic-edgy-cute-pretty-face-ai-generated_590464-133625.jpg",
      name: "Kara",
    },
    {
      id: 9,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlg-CxlZKDcxDKSTdphgl4TR1IjDQJZ8ZhHA&s",
      name: "Liam",
    },
    {
      id: 10,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0z1vJ2J62FseV3M4h0CFceQ0wD_RnM9zR9w&s",
      name: "Mia",
    },
    {
      id: 11,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVxxpgvGdGyLx1RNWkJ1QKDv6xAUKrFHLgA&s",
      name: "Noah",
    },
    {
      id: 12,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETbUlr0jNr2Nvb2Js3aIjx8WBnt53DvBrTA&s",
      name: "Olivia",
    },
    {
      id: 13,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCA93Su-mIzxxgMNFhyeO1JqEla8Od3J0DYw&s",
      name: "Paul",
    },
    {
      id: 14,
      avatar:
        "https://media.istockphoto.com/id/517234226/photo/i-see-no-good-reason-to-act-my-age.jpg?s=612x612&w=0&k=20&c=qx2j21ZtwPWJuvrLD8uvegXz9z4YSQQnflUyGlBkyic=",
      name: "Quinn",
    },
    {
      id: 15,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxenC29GMg7a9Ktv5IaG6J-V-EfVO8n5RR5A&s",
      name: "Rachel",
    },
    {
      id: 16,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWuPfC-r2bGMPLipn2PC45v0B1Ff3_yMypA&s",
      name: "Samuel",
    },
    {
      id: 17,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxNIJOcRmhiiHtUASXj-kjt3NVPj5lSye64g&s",
      name: "Tina",
    },
    {
      id: 18,
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/026/153/976/small_2x/an-old-black-man-portrait-created-with-generative-ai-technology-photo.jpg",
      name: "Victor",
    },
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
