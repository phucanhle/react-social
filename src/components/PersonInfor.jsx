import styled from "styled-components";

const Personal = styled.div`
    position: relative;
    width: 100%;
    height: 110px;
    padding: 10px 20px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    display: flex;
    align-items: center;

    & > img {
        height: 80px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border: 3px solid #eee;
        border-radius: 150px;
        box-shadow: rgba(50, 50, 50, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }

    & h3 {
        max-width: 60%;
        margin: 0 30px;
        font-size: 18x;
        font-weight: bold;
        line-height: 1.3;
        color: var(--black);
        text-wrap: wrap;
    }
`;
const PersonaInfor = ({ user }) => {
    const avatar = user.avatar || "https://thumbs.dreamstime.com/b/man-13007581.jpg";
    return (
        <Personal>
            <img src={avatar} alt="avatar" />
            <h3>{user.username}</h3>
        </Personal>
    );
};

export default PersonaInfor;
