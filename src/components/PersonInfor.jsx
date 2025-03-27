import styled from "styled-components";

const Personal = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 24px;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  & > img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 3px solid #f0f2f5;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      border-color: #0d7c66;
    }
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.4;
  }

  & p {
    margin: 0;
    font-size: 14px;
    color: #65676b;
    display: flex;
    align-items: center;
    gap: 8px;

    &:first-of-type {
      color: #0d7c66;
      font-weight: 500;
    }

    & svg {
      width: 16px;
      height: 16px;
      color: #65676b;
    }
  }
`;

const PersonaInfor = ({ user }) => {
  const avatar =
    user.avatar ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Jfr_FucK_O08_tca9aG6sbZR-ACtgF1kNw&s";
  return (
    <Personal>
      <img src={avatar} alt={`avatar-of-${user.username}`} />
      <Info>
        <h3>{user.username}</h3>
        <p>@{user.username}</p>
        <p>
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
              d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
            />
          </svg>
          20 bạn bè
        </p>
      </Info>
    </Personal>
  );
};

export default PersonaInfor;
