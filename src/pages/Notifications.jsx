import styled from "styled-components";
import { useTranslation } from "../hooks/useTranslation";

const Container = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #1a1a1a;
`;

const NotificationList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const NotificationItem = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e4e6eb;
    margin-right: 16px;
`;

const Content = styled.div`
    flex: 1;
`;

const Message = styled.p`
    font-size: 15px;
    color: #1a1a1a;
    margin-bottom: 4px;
`;

const Time = styled.span`
    font-size: 13px;
    color: #65676b;
`;

const Notifications = () => {
    const { t } = useTranslation();

    // Mock data - thay thế bằng dữ liệu thực từ API
    const notifications = [
        {
            id: 1,
            message: "Nguyễn Văn A đã thích bài viết của bạn",
            time: "2 phút trước"
        },
        {
            id: 2,
            message: "Trần Thị B đã bình luận về bài viết của bạn",
            time: "1 giờ trước"
        },
        {
            id: 3,
            message: "Lê Văn C đã chia sẻ bài viết của bạn",
            time: "3 giờ trước"
        }
    ];

    return (
        <Container>
            <Title>{t('menu.notifications')}</Title>
            <NotificationList>
                {notifications.map((notification) => (
                    <NotificationItem key={notification.id}>
                        <Avatar />
                        <Content>
                            <Message>{notification.message}</Message>
                            <Time>{notification.time}</Time>
                        </Content>
                    </NotificationItem>
                ))}
            </NotificationList>
        </Container>
    );
};

export default Notifications; 