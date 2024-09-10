import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 340px;
    padding: 15px;
    position: fixed;
    bottom: 1%;

    & p {
        font-size: 14px;
        font-weight: 500;
        color: #6d6f73;
        margin-bottom: 10px;
    }
    & > button {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        border-radius: 100px;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
`;

const Items = styled.div`
    width: 100%;
    heigh: 50px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    background-color: white;
    box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
        rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
        rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
        rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
        rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
        rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
    & img {
        width: 120px;
        border-radius: 10px;
    }
    & .content {
        margin-left: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        & h3 {
            font-size: 16px;
            font-weight: 500;
        }
        & button {
            background: none;
            width: 100%;
            padding: 10px 5px;
            border: 1px solid #ebc33f;
            border-radius: 5px;
            cursor: pointer;
            color: #ebc33f;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            &:hover {
                color: white;
                background-color: #ebc33f;
            }
        }
    }
`;
const Banner = () => {
    return (
        <Container>
            <p>Được tài trợ</p>
            <button>
                <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="#6d6f73"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                    />
                </svg>
            </button>
            <Items>
                <img
                    src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t45.1600-4/456924430_120210534704990698_2810865610871425684_n.jpg?stp=cp0_dst-jpg_q75_s526x296_spS444&_nc_cat=108&ccb=1-7&_nc_sid=c02adf&_nc_ohc=19Mpo83i4dIQ7kNvgEw1rGE&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=AWPdwzHCZSyz5nOgTjezJhz&oh=00_AYDychPdpsNEIGIcjCGghhWlbN_cCWD4rv9kRMEsbiNLGw&oe=66E4E5DB"
                    alt=""
                />
                <div className="content">
                    <h3>Reserve Flow Lite for $1 Get $60 Off and ...</h3>
                    <button>Xem thêm</button>
                </div>
            </Items>
        </Container>
    );
};
export default Banner;
