import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    margin: 16px 0 0;
    padding: 16px 0 0;
    border-top: 1px solid #f0f2f5;

    & input {
        flex: 1;
        padding: 12px 16px;
        font-size: 14px;
        border: 1px solid #e4e6eb;
        border-radius: 20px;
        background-color: #f0f2f5;
        transition: all 0.2s ease;
        color: #1a1a1a;

        &:focus {
            outline: none;
            border-color: #0d7c66;
            background-color: white;
            box-shadow: 0 0 0 2px rgba(13, 124, 102, 0.1);
        }

        &::placeholder {
            color: #65676b;
        }
    }

    & button {
        padding: 8px 20px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 20px;
        background-color: #0d7c66;
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;

        &:hover {
            background-color: #0b6b56;
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }

        &:disabled {
            background-color: #e4e6eb;
            color: #65676b;
            cursor: not-allowed;
            transform: none;
        }
    }
`;

const Comment = () => {
    return (
        <Container>
            <input 
                type="text" 
                placeholder="Viết bình luận..." 
            />
            <button>
                <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                </svg>
                Gửi
            </button>
        </Container>
    );
};

export default Comment;
