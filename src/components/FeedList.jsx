import styled from "styled-components";
import Feed from "./Feed";
import Post from "./Post";
import { useSelector } from "react-redux";

const Container = styled.div`
    width: 100%;
`;

//  Options are "friendlist" or "own" or "saved".
const FeedList = ({ feeds, post }) => {
    const user = useSelector((state) => state.auth.user);

    return (
        <Container>
            {post ?? <Post user={user} />}
            {feeds.map((item) => (
                <Feed post={item} key={item.postid} />
            ))}
        </Container>
    );
};

export default FeedList;
