import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FriendList.css";
import { friendList } from "../mockdata/friendData";
import { useTranslation } from "../hooks/useTranslation";

const FriendList = ({ onFriendSelect }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        <div className="friend-list-container">
            <h3>{t('friendList.friendCount').replace('{count}', friendList.length)}</h3>
            <ul className="friend-list" onMouseLeave={handleMouseLeave}>
                {friendList.map((item, index) => (
                    <li
                        key={index}
                        className="friend-item"
                        onClick={() => handleFriendClick(item)}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <img src={item.avatar} alt={`avatar-of-${item.name}`} />
                        <p>{item.name}</p>
                        {hoveredIndex === index && window.innerWidth > 1024 && (
                            <div className="friend-popup" style={{ top: index >= 4 ? "" : "10px" }}>
                                <img
                                    src={item.avatar}
                                    alt={`avatar-of-${item.name}`}
                                />
                                <p>{item.name}</p>
                                <div className="actions">
                                    <button className="primary">
                                        <Link to="/chat">{t('friendList.message')}</Link>
                                    </button>
                                    <button>
                                        <Link to={`/user/${item.id}`}>
                                            {t('friendList.profile')}
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default memo(FriendList);
