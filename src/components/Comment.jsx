import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-item: center;
    margin: 10px 0;
    & input,
    button {
        padding: 10px 20px;
        font-size: 16px;
        border: 0;
        outline: none;
        border-radius: 5px;
    }
    & input {
        width: 80%;
        border: 1px solid #eee;

        margin-right: 10px;
        &:focus {
            border-color: #0d7c66;
        }
    }
    & button {
        width: 20%;
        cursor: pointer;
        &:hover {
            background-color: #0d7c66;
            color: white;
        }
    }
`;

const Comment = () => {
    return (
        <Container>
            <input type="text" placeholder="Nhập bình luận của bạn..." />
            <button>Send</button>
        </Container>
    );
};

export default Comment;
