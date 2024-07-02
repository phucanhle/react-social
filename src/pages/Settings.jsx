import { useSelector } from "react-redux";
import styled from "styled-components";
const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 780px;
    margin: 0 auto;
    padding: 50px 0 0;
`;
const Field = styled.div`
    width: 100%;
    padding: 20px;

    & h1 {
        margin: 10px 0;
        font-size: 20px;
        font-weight: bold;
        color: var(--navy);
        line-height: 1.5;
    }

    & p {
        margin: 10px 0;
    }

    & button,
    select {
        padding: 5px 10px;
        width: 30%;
        cursor: pointer;
        font-size: 16px;
        font-family: inherit;
        margin: 0 10px 0 0;
    }
`;

const Setting = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Container>
            <Field>
                <h1>Tài khoản</h1>
                <p>Username: {user.username}</p>
                <p>Email: {user.email || "no@example.com"}</p>
                <button>Đổi mật khẩu</button>
                <button>Đổi Email</button>
            </Field>

            <Field>
                <h1>Ngôn ngữ</h1>
                <select name="lang" id="">
                    <option value="">English</option>
                    <option value="">Tiếng Việt</option>
                </select>
            </Field>
        </Container>
    );
};

export default Setting;
