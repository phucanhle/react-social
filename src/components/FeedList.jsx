import { memo, useMemo } from "react";
import styled from "styled-components";
import Feed from "./Feed";
import Post from "./CreatePost";
import { useSelector } from "react-redux";
import "./FeedList.css";

const Container = styled.div`
  width: 100%;
  // max-width: 680px;
  
`;

//  Options are "friendlist" or "own" or "saved".
const FeedList = memo(({ feeds, post }) => {
  const user = useSelector((state) => state.auth.user);

  // Memoize Post component để tránh re-render khi feeds thay đổi
  const postComponent = useMemo(() => {
    if (!post) return null;
    return <Post user={user} />;
  }, [post, user]);

  // Memoize Feed components để tránh re-render không cần thiết
  const feedComponents = useMemo(() => {
    return feeds.map((item) => (
      <Feed post={item} key={item.postid} />
    ));
  }, [feeds]);

  return (
    <Container>
      {postComponent}
      {feedComponents}
    </Container>
  );
});

FeedList.displayName = "FeedList";

export default FeedList;
