import styled from "styled-components";
import FeedList from "../components/FeedList";
// import ImageViewer from "../components/ImageViewer";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 50px 0 0;
  display: flex;
  justify-content: center;
`;

const Saved = () => {
  const feeds = [
    {
      postid: 1,
      user: {
        avatar:
          "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
        name: "Alice",
      },
      content: "A mountain",
      imgSrc: [
        "https://www.thoughtco.com/thmb/EKnmgoAr_X4TrIpxBiPYu9lao9U=/2000x1333/filters:fill(auto,1)/GettyImages-468963673-5ad40ad2fa6bcc0036add08a.jpg",
      ],
      Liked: [],
      Saved: [],
    },
    {
      postid: 2,
      user: {
        avatar:
          "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
        name: "Frank",
      },
      content: "Dragon ball hehehe",
      imgSrc: [
        "https://i.pinimg.com/564x/02/ba/65/02ba65e0f3b88a0f679f6f1e0b9b4a59.jpg",
        "https://wallpaperaccess.com/full/4211388.jpg",
        "https://i.pinimg.com/originals/d8/07/11/d80711b7df97434667621b8054ba8956.jpg",
      ],
      Liked: [],
      Saved: [],
    },
    {
      postid: 3,
      user: {
        avatar:
          "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
        name: "Alice",
      },
      content: "New Home!!",
      imgSrc: [
        "https://i.pinimg.com/564x/8b/3b/1d/8b3b1d69c4e45f903002a9ab1ffa53d3.jpg",
        "https://i.pinimg.com/564x/55/67/f9/5567f98308341de496b26d8a88f896c9.jpg",
      ],
      Liked: [],
      Saved: [],
    },
    {
      postid: 4,
      user: {
        avatar:
          "https://th.bing.com/th/id/OIP.QjynegEfQVPq5kIEuX9fWQHaFj?rs=1&pid=ImgDetMain",
        name: "Me",
      },
      content: "New Home!!",
      imgSrc: [
        "https://i.pinimg.com/564x/8b/3b/1d/8b3b1d69c4e45f903002a9ab1ffa53d3.jpg",
        "https://i.pinimg.com/564x/55/67/f9/5567f98308341de496b26d8a88f896c9.jpg",
      ],
      Liked: [],
      Saved: [],
    },
  ];
  
  return (
    <Container>
      <ImageViewer>
        {({ onImageClick }) => (
          <FeedList feeds={feeds} post={false} onImageClick={onImageClick} />
        )}
      </ImageViewer>
    </Container>
  );
};

export default Saved;
