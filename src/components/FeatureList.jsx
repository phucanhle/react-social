import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import PersonaInfor from "./PersonInfor";
import { useTranslation } from "../hooks/useTranslation";

const Container = styled.div`
    position: fixed;
    width: 100%;
    max-width: 340px;
    padding: 20px 0;
    margin: 0 10px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    overflow-x: hidden;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    & hr {
        width: 90%;
        margin: 16px auto;
        border: none;
        height: 1px;
        background-color: #f0f2f5;
    }

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

const Features = styled.ul`
    margin: 0;
    width: 100%;
    padding: 0 10px;

    & li {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-radius: 12px;
        margin: 4px 0;
        transition: all 0.2s ease;
        cursor: pointer;

        & svg {
            width: 24px;
            height: 24px;
            margin-right: 16px;
            color: #65676b;
            transition: all 0.2s ease;
        }

        & a {
            text-decoration: none;
            color: #1a1a1a;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        &:hover {
            background-color: #f0f2f5;
            transform: translateX(4px);

            & svg {
                color: #0d7c66;
            }

            & a {
                color: #0d7c66;
            }
        }
    }
`;

const Button = styled.button`
    width: 90%;
    padding: 12px 20px;
    margin: 16px auto;
    display: block;
    border-radius: 12px;
    font-family: inherit;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #0d7c66;
    background-color: transparent;
    color: #0d7c66;

    &:hover {
        background-color: #0d7c66;
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(13, 124, 102, 0.2);
    }

    &:active {
        transform: translateY(0);
    }
`;

const FeatureList = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <Container>
            <PersonaInfor user={user} />
            <hr />
            <Features>
                <li>
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    <Link to={"/personal"}>{t('navigation.profile')}</Link>
                </li>
                <li>
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                        />
                    </svg>
                    <Link to="/chat">{t('navigation.chat')}</Link>
                </li>
                <li>
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
                            d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"
                        />
                    </svg>
                    <Link to="/">{t('navigation.discussion')}</Link>
                </li>
                <li>
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
                            d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                        />
                    </svg>
                    <Link to="saved">{t('navigation.saved')}</Link>
                </li>
                <li>
                    <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    <Link to="/settings">{t('navigation.settings')}</Link>
                </li>
            </Features>
            <Button onClick={handleLogout}>
                {t('navigation.logout')}
            </Button>
        </Container>
    );
};

export default FeatureList;
