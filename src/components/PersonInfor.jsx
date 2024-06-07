import styled from "styled-components";

const Personal = styled.div`
    position: relative;
    width: 100%;
    // height: 110px;
    background-color: white;
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
`;

const Info = styled.div`
    max-width: 60%;
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    & h3 {
        font-size: 18x;
        font-weight: bold;
        line-height: 1.3;
        color: var(--black);
        text-wrap: wrap;
        margin: 5px 0;
    }
    & p {
        margin: 3px 0;
        font-size: 14px;
        color: #555;
    }
`;

const PersonaInfor = ({ user }) => {
    const avatar = user.avatar || "https://thumbs.dreamstime.com/b/man-13007581.jpg";
    return (
        <Personal>
            <img src={avatar} alt="avatar" />
            <Info>
                <h3>{user.username}</h3>
                <p>@{user.username}</p>
                <p>20 bạn</p>
            </Info>
        </Personal>
    );
};

export default PersonaInfor;
