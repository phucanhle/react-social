import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { setLanguage } from "../redux/languageSlice";
import { useTranslation } from "../hooks/useTranslation";

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 780px;
    margin: 0 auto;
    padding: 80px 24px 24px;
    background-color: #f0f2f5;
`;

const Section = styled.div`
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }
`;

const SectionHeader = styled.div`
    padding: 20px 24px;
    border-bottom: 1px solid #f0f2f5;
    display: flex;
    align-items: center;
    gap: 12px;

    & h2 {
        position: relative;
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -10px;
            display: block;
            width: 4px;
            height: 18px;
            background-color: #0d7c66;
            border-radius: 2px;
            margin-right: 12px;
        }
    }

    & svg {
        width: 24px;
        height: 24px;
        color: #0d7c66;
    }
`;

const SectionContent = styled.div`
    padding: 24px;
`;

const InfoGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f0f2f5;
        transform: translateX(4px);
    }

    & .info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        & label {
            font-size: 14px;
            color: #65676b;
        }

        & span {
            font-size: 16px;
            font-weight: 500;
            color: #1a1a1a;
        }
    }

    & button {
        padding: 8px 16px;
        border: 1px solid #0d7c66;
        border-radius: 8px;
        background-color: transparent;
        color: #0d7c66;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background-color: #0d7c66;
            color: white;
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 24px;

    & button {
        flex: 1;
        padding: 12px 24px;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &.primary {
            background-color: #0d7c66;
            color: white;

            &:hover {
                background-color: #0b6b56;
                transform: translateY(-1px);
            }
        }

        &.secondary {
            background-color: #f0f2f5;
            color: #1a1a1a;

            &:hover {
                background-color: #e4e6eb;
                transform: translateY(-1px);
            }
        }

        &.danger {
            background-color: #fee2e2;
            color: #dc2626;

            &:hover {
                background-color: #fecaca;
                transform: translateY(-1px);
            }
        }

        &:active {
            transform: translateY(0);
        }
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e4e6eb;
    border-radius: 12px;
    font-size: 14px;
    color: #1a1a1a;
    background-color: #f8f9fa;
    cursor: pointer;
    transition: all 0.2s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230d7c66' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 20px;

    &:focus {
        outline: none;
        border-color: #0d7c66;
        background-color: white;
        box-shadow: 0 0 0 3px rgba(13, 124, 102, 0.1);
    }

    &:hover {
        border-color: #0d7c66;
    }
`;

const Setting = () => {
    const user = useSelector((state) => state.auth.user);
    const currentLanguage = useSelector((state) => state.language.currentLanguage);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        messages: true
    });

    const handleLanguageChange = (e) => {
        dispatch(setLanguage(e.target.value));
    };

    const handleNotificationChange = (type) => {
        setNotifications(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
        // TODO: Implement notification settings logic
    };

    const handlePasswordChange = () => {
        // TODO: Implement password change logic
    };

    const handleEmailChange = () => {
        // TODO: Implement email change logic
    };

    const handleDeleteAccount = () => {
        // TODO: Implement account deletion logic
    };

    return (
        <Container>
            <Section>
                <SectionHeader>
                    <h2>{t('settings.accountInfo')}</h2>
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </SectionHeader>
                <SectionContent>
                    <InfoGroup>
                        <InfoItem>
                            <div className="info">
                                <label>{t('settings.username')}</label>
                                <span>{user.username}</span>
                            </div>
                            <button onClick={handlePasswordChange}>{t('settings.changePassword')}</button>
                        </InfoItem>
                        <InfoItem>
                            <div className="info">
                                <label>{t('settings.email')}</label>
                                <span>{user.email || "Chưa cập nhật"}</span>
                            </div>
                            <button onClick={handleEmailChange}>{t('settings.changeEmail')}</button>
                        </InfoItem>
                    </InfoGroup>
                </SectionContent>
            </Section>

            <Section>
                <SectionHeader>
                    <h2>{t('settings.language')}</h2>
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
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                    </svg>
                </SectionHeader>
                <SectionContent>
                    <Select value={currentLanguage} onChange={handleLanguageChange}>
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                    </Select>
                </SectionContent>
            </Section>

            <Section>
                <SectionHeader>
                    <h2>{t('settings.notifications')}</h2>
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
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </SectionHeader>
                <SectionContent>
                    <InfoGroup>
                        <InfoItem>
                            <div className="info">
                                <label>{t('settings.emailNotifications')}</label>
                                <span>{t('settings.emailNotificationsDesc')}</span>
                            </div>
                            <button 
                                onClick={() => handleNotificationChange("email")}
                                style={{
                                    backgroundColor: notifications.email ? "#0d7c66" : "#f0f2f5",
                                    color: notifications.email ? "white" : "#1a1a1a"
                                }}
                            >
                                {notifications.email ? t('settings.on') : t('settings.off')}
                            </button>
                        </InfoItem>
                        <InfoItem>
                            <div className="info">
                                <label>{t('settings.pushNotifications')}</label>
                                <span>{t('settings.pushNotificationsDesc')}</span>
                            </div>
                            <button 
                                onClick={() => handleNotificationChange("push")}
                                style={{
                                    backgroundColor: notifications.push ? "#0d7c66" : "#f0f2f5",
                                    color: notifications.push ? "white" : "#1a1a1a"
                                }}
                            >
                                {notifications.push ? t('settings.on') : t('settings.off')}
                            </button>
                        </InfoItem>
                        <InfoItem>
                            <div className="info">
                                <label>{t('settings.messageNotifications')}</label>
                                <span>{t('settings.messageNotificationsDesc')}</span>
                            </div>
                            <button 
                                onClick={() => handleNotificationChange("messages")}
                                style={{
                                    backgroundColor: notifications.messages ? "#0d7c66" : "#f0f2f5",
                                    color: notifications.messages ? "white" : "#1a1a1a"
                                }}
                            >
                                {notifications.messages ? t('settings.on') : t('settings.off')}
                            </button>
                        </InfoItem>
                    </InfoGroup>
                </SectionContent>
            </Section>

            <Section>
                <SectionHeader>
                    <h2>{t('settings.accountManagement')}</h2>
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </SectionHeader>
                <SectionContent>
                    <ButtonGroup>
                        <button className="danger" onClick={handleDeleteAccount}>
                            {t('settings.deleteAccount')}
                        </button>
                    </ButtonGroup>
                </SectionContent>
            </Section>
        </Container>
    );
};

export default Setting;
