import styled from "styled-components";
import Movie from "../components/Movie";
const Article = styled.article`
    min-height: calc(100vh);
    background-color: var(--white);
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 50px 0;
`;

const News = () => {
    const movies = [
        {
            title: "MÓNG VUỐT",
            summary:
                "Móng Vuốt lấy bối cảnh một chuyến dã ngoại vui vẻ trong rừng sâu của một nhóm bạn 7 người. Chẳng ai ngờ được chuyến đi “cứu vãn” tình bạn lại dẫn đến một kết cục bi thảm, nhớ đời khi phải chống lại “con thú” hung hãn và khát máu đang đe dọa tính mạng của cả nhóm.",
            banner: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202405/11050_103_100004.jpg",
        },
        {
            title: "DORAEMON: NOBITA VÀ BẢN GIAO HƯỞNG ĐỊA CẦU",
            summary: `TÁC PHẨM KỶ NIỆM 90 NĂM FUJIKO F FUJIO Chuẩn bị cho buổi hòa nhạc ở trường, Nobita đang tập thổi sáo - nhạc cụ mà cậu dở tệ. Thích thú trước nốt "No" lạc quẻ của Nobita, Micca - cô bé bí ẩn đã mời Doraemon, Nobita cùng nhóm bạn đến "Farre" - Cung điện âm nhạc tọa lạc trên một hành tinh nơi âm nhạc sẽ hóa thành năng lượng. Nhằm cứu cung điện này, Micca đang tìm kiếm "virtuoso" - bậc thầy âm nhạc sẽ cùng mình biểu diễn! Với bảo bối thần kì "chứng chỉ chuyên viên âm nhạc", Doraemon và các bạn đã chọn nhạc cụ, cùng Micca hòa tấu, từng bước khôi phục cung điện. Tuy nhiên, một vật thể sống đáng sợ sẽ xóa số âm nhạc khỏi thế giới đang đến gần, Trái Đất đang rơi vào nguy hiểm... ! Liệu những người bạn nhỏ có thể cứu được "tương lai âm nhạc" và cả địa cầu này?`,
            banner: "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202405/11421_103_100003.jpg",
        },
    ];

    return (
        <Article>
            {movies.map((item, index) => {
                return <Movie key={index} movie={item} />;
            })}
        </Article>
    );
};

export default News;
