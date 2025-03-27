import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [
        {
            postid: 1,
            user: {
                name: "Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1"
            },
            content: "Hôm nay trời đẹp quá! 🌞",
            imgSrc: [
                "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
                "https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75"
            ],
            createdAt: "2024-03-20T10:00:00.000Z",
            likes: 42,
            comments: [
                {
                    id: 1,
                    user: {
                        name: "Trần Thị B",
                        avatar: "https://i.pravatar.cc/150?img=2"
                    },
                    content: "Đúng rồi, trời đẹp thật! 😊",
                    createdAt: "2024-03-20T10:05:00.000Z"
                }
            ]
        },
        {
            postid: 2,
            user: {
                name: "Lê Văn C",
                avatar: "https://i.pravatar.cc/150?img=3"
            },
            content: "Chia sẻ khoảnh khắc đẹp 🌅",
            imgSrc: [
                "https://images.unsplash.com/photo-1489515217757-5fd1be406fef"
            ],
            createdAt: "2024-03-19T15:30:00.000Z",
            likes: 28,
            comments: []
        },
        {
            postid: 3,
            user: {
                name: "Phạm Thị D",
                avatar: "https://i.pravatar.cc/150?img=4"
            },
            content: "Video mới nhất của tôi 🎥",
            imgSrc: [
                "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            ],
            type: "video",
            createdAt: "2024-03-18T09:15:00.000Z",
            likes: 156,
            comments: [
                {
                    id: 2,
                    user: {
                        name: "Hoàng Văn E",
                        avatar: "https://i.pravatar.cc/150?img=5"
                    },
                    content: "Video rất hay! 👍",
                    createdAt: "2024-03-18T09:20:00.000Z"
                }
            ]
        }
    ],
    loading: false,
    error: null
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.postid === action.payload.postid);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.postid !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { 
    addPost, 
    setPosts, 
    updatePost, 
    deletePost,
    setLoading,
    setError 
} = postSlice.actions;

export default postSlice.reducer; 