import styled from "styled-components";
import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
    position: fixed;
    max-height: calc(100vh - 50px - 40px);
    width: 100%;
    max-width: 340px;
    border-radius: 16px;
    padding: 20px 0;
    margin: 0 10px;
    z-index: 2;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    & h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 20px 16px;
        color: #1a1a1a;
        display: flex;
        align-items: center;
        gap: 8px;

        &::before {
            content: '';
            display: block;
            width: 4px;
            height: 18px;
            background-color: #0d7c66;
            border-radius: 2px;
        }
    }

    @media screen and (max-width: 1024px) {
        max-width: 280px;
        padding: 16px 0;

        & h3 {
            font-size: 16px;
            margin: 0 16px 12px;
        }
    }
`;

const List = styled.ul`
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 140px);
    padding: 0 10px;
    overflow-x: hidden;

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

const ItemContainer = styled.li`
    width: 100%;
    margin: 8px 0;
    padding: 8px 12px;
    border-radius: 12px;
    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f0f2f5;
        transform: translateX(4px);
    }

    & > img {
        position: relative;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 2px solid #f0f2f5;
        transition: transform 0.2s ease;

        &:hover {
            transform: scale(1.05);
        }
    }

    & p {
        font-size: 15px;
        font-weight: 500;
        margin: 0 12px;
        color: #1a1a1a;
    }

    &:after {
        background-color: #0d7c66;
        content: " ";
        width: 10px;
        height: 10px;
        position: absolute;
        z-index: 3;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 2px #0d7c66;
    }

    @media screen and (max-width: 1024px) {
        padding: 6px 10px;

        & > img {
            width: 36px;
            height: 36px;
        }

        & p {
            font-size: 14px;
            margin: 0 8px;
        }
    }
`;

const Popup = styled.div`
    width: 280px;
    height: 180px;
    position: absolute;
    bottom: 50px;
    left: 80px;
    z-index: 5;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    overflow: hidden;

    & > img {
        border-radius: 16px 16px 0 0;
        width: 100%;
        height: 50%;
        object-fit: cover;
    }

    & p {
        padding: 12px;
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
    }

    & .actions {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 12px;
        gap: 8px;

        & button {
            flex: 1;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            background: none;
            border-radius: 8px;
            border: 1px solid #0d7c66;
            cursor: pointer;
            transition: all 0.2s ease;

            &.primary {
                background-color: #0d7c66;
                color: white;
                border: none;

                &:hover {
                    background-color: #0b6b56;
                    transform: translateY(-1px);
                }
            }

            &:hover {
                background-color: #f0f2f5;
                transform: translateY(-1px);
            }

            & a {
                color: inherit;
                text-decoration: none;
                display: block;
                text-align: center;
            }
        }
    }

    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

const FriendList = ({ onFriendSelect }) => {
    const listFriend = [
        {
            id: 1,
            avatar: "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725580800&semt=ais_hybrid",
            name: "David",
        },
        {
            id: 2,
            avatar: "https://www.shutterstock.com/image-photo/smiling-cheerful-young-adult-african-600nw-1850821510.jpg",
            name: "Grace",
        },
        {
            id: 3,
            avatar: "https://cdn.pixabay.com/photo/2021/06/04/10/28/portrait-6309448_1280.jpg",
            name: "Frank",
        },
        {
            id: 4,
            avatar: "https://media.istockphoto.com/id/1369508766/photo/beautiful-successful-latin-woman-smiling.jpg?s=612x612&w=0&k=20&c=LoznG6eGT42_rs9G1dOLumOTlAveLpuOi_U755l_fqI=",
            name: "Eva",
        },
        {
            id: 5,
            avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
            name: "Henry",
        },
        {
            id: 6,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6ulsxkO3-I7dHKu72hCdugh05b0VLaHcKw&s",
            name: "Isabella",
        },
        {
            id: 7,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCAlLasNECygcPJv66hzob9fQOsmqwfAIGOg&s",
            name: "Jack",
        },
        {
            id: 8,
            avatar: "https://img.freepik.com/premium-photo/natural-real-person-portrait-closeup-woman-girl-female-outside-nature-forest-artistic-edgy-cute-pretty-face-ai-generated_590464-133625.jpg",
            name: "Kara",
        },
        {
            id: 9,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlg-CxlZKDcxDKSTdphgl4TR1IjDQJZ8ZhHA&s",
            name: "Liam",
        },
        {
            id: 10,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0z1vJ2J62FseV3M4h0CFceQ0wD_RnM9zR9w&s",
            name: "Mia",
        },
        {
            id: 11,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVxxpgvGdGyLx1RNWkJ1QKDv6xAUKrFHLgA&s",
            name: "Noah",
        },
        {
            id: 12,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETbUlr0jNr2Nvb2Js3aIjx8WBnt53DvBrTA&s",
            name: "Olivia",
        },
        {
            id: 13,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCA93Su-mIzxxgMNFhyeO1JqEla8Od3J0DYw&s",
            name: "Paul",
        },
        {
            id: 14,
            avatar: "https://media.istockphoto.com/id/517234226/photo/i-see-no-good-reason-to-act-my-age.jpg?s=612x612&w=0&k=20&c=qx2j21ZtwPWJuvrLD8uvegXz9z4YSQQnflUyGlBkyic=",
            name: "Quinn",
        },
        {
            id: 15,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxenC29GMg7a9Ktv5IaG6J-V-EfVO8n5RR5A&s",
            name: "Rachel",
        },
        {
            id: 16,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWuPfC-r2bGMPLipn2PC45v0B1Ff3_yMypA&s",
            name: "Samuel",
        },
        {
            id: 17,
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxNIJOcRmhiiHtUASXj-kjt3NVPj5lSye64g&s",
            name: "Tina",
        },
        {
            id: 18,
            avatar: "https://static.vecteezy.com/system/resources/thumbnails/026/153/976/small_2x/an-old-black-man-portrait-created-with-generative-ai-technology-photo.jpg",
            name: "Victor",
        },
    ];
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleFriendClick = (friend) => {
        if (window.innerWidth <= 1024) {
            navigate('/chat', { state: { selectedFriend: friend } });
        } else {
            onFriendSelect(friend);
        }
    };

    return (
        <Container>
            <h3>Bạn bè ({listFriend.length})</h3>
            <List onMouseLeave={handleMouseLeave}>
                {listFriend.map((item, index) => (
                    <ItemContainer
                        key={index}
                        onClick={() => handleFriendClick(item)}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <img src={item.avatar} alt={`avatar-of-${item.name}`} />
                        <p>{item.name}</p>
                        {hoveredIndex === index && window.innerWidth > 1024 && (
                            <Popup style={{ top: index >= 4 ? "" : "10px" }}>
                                <img
                                    src={item.avatar}
                                    alt={`avatar-of-${item.name}`}
                                />
                                <p>{item.name}</p>
                                <div className="actions">
                                    <button className="primary">
                                        <Link to="/chat">Nhắn tin</Link>
                                    </button>
                                    <button>
                                        <Link to={`/${item.id}`}>
                                            Trang cá nhân
                                        </Link>
                                    </button>
                                </div>
                            </Popup>
                        )}
                    </ItemContainer>
                ))}
            </List>
        </Container>
    );
};

export default memo(FriendList);
