import styled from "styled-components";
import Feed from "./Feed";
import Post from "./Post";
import { useSelector } from "react-redux";

const Container = styled.div`
    width: 100%;
`;
const FeedList = () => {
    const user = useSelector((state) => state.auth.user);

    const friendPost = [
        {
            id: 1,
            user: {
                avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
                name: "Alice",
            },
            content: "A moutaint",
            imgSrc: [
                "https://www.thoughtco.com/thmb/EKnmgoAr_X4TrIpxBiPYu9lao9U=/2000x1333/filters:fill(auto,1)/GettyImages-468963673-5ad40ad2fa6bcc0036add08a.jpg",
            ],
        },
        {
            id: 2,
            user: {
                avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
                name: "Alice",
            },
            content: "A moutaint",
            imgSrc: [
                "https://th.bing.com/th/id/OIP.sjLOwGj7D1WMvvl81hb1DwHaJQ?w=700&h=875&rs=1&pid=ImgDetMain",
                "https://th.bing.com/th/id/OIG4.PpNLJpWqW3qrqt84jqzT?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
                "https://th.bing.com/th/id/OIG4.PpNLJpWqW3qrqt84jqzT?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
            ],
        },
        {
            id: 3,
            user: {
                avatar: "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
                name: "Alice",
            },
            content: "A moutaint",
            imgSrc: [
                "https://th.bing.com/th/id/OIG4.PpNLJpWqW3qrqt84jqzT?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
                "https://th.bing.com/th/id/OIG4.PpNLJpWqW3qrqt84jqzT?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
            ],
        },
    ];

    return (
        <Container>
            <Post user={user} />
            {friendPost.map((item, index) => {
                return <Feed post={item} key={index} />;
            })}
        </Container>
    );
};
export default FeedList;
