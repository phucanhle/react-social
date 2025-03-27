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

const EventList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const EventCard = styled.div`
    display: flex;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const EventImage = styled.div`
    width: 200px;
    height: 150px;
    background-color: #e4e6eb;
    flex-shrink: 0;
`;

const EventContent = styled.div`
    padding: 16px;
    flex: 1;
`;

const EventTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
`;

const EventInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #65676b;
    font-size: 14px;
`;

const EventActions = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 16px;
`;

const Button = styled.button`
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &.primary {
        background-color: #0d7c66;
        color: white;
        border: none;

        &:hover {
            background-color: #0b6a56;
        }
    }

    &.secondary {
        background-color: transparent;
        color: #0d7c66;
        border: 1px solid #0d7c66;

        &:hover {
            background-color: #f0f2f5;
        }
    }
`;

const Events = () => {
    const { t } = useTranslation();

    // Mock data - thay thế bằng dữ liệu thực từ API
    const events = [
        {
            id: 1,
            title: "Họp mặt cộng đồng",
            date: "15/05/2024",
            time: "19:00",
            location: "Quận 1, TP.HCM",
            description: "Buổi họp mặt thường niên của cộng đồng"
        },
        {
            id: 2,
            title: "Workshop Công nghệ",
            date: "20/05/2024",
            time: "14:00",
            location: "Quận 3, TP.HCM",
            description: "Chia sẻ về các công nghệ mới nhất"
        }
    ];

    return (
        <Container>
            <Title>{t('menu.events')}</Title>
            <EventList>
                {events.map((event) => (
                    <EventCard key={event.id}>
                        <EventImage />
                        <EventContent>
                            <EventTitle>{event.title}</EventTitle>
                            <EventInfo>
                                <div>📅 {event.date}</div>
                                <div>🕒 {event.time}</div>
                                <div>📍 {event.location}</div>
                                <div>{event.description}</div>
                            </EventInfo>
                            <EventActions>
                                <Button className="primary">Tham gia</Button>
                                <Button className="secondary">Chi tiết</Button>
                            </EventActions>
                        </EventContent>
                    </EventCard>
                ))}
            </EventList>
        </Container>
    );
};

export default Events; 