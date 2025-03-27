export const mockUsers = [
    {
        id: 1,
        name: "David",
        avatar: "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg",
        email: "david@example.com",
        bio: "Photography enthusiast",
        followers: 2345,
        following: 789
    },
    {
        id: 2,
        name: "Grace",
        avatar: "https://www.shutterstock.com/image-photo/smiling-cheerful-young-adult-african-600nw-1850821510.jpg",
        email: "grace@example.com",
        bio: "Travel lover",
        followers: 3456,
        following: 456
    },
    {
        id: 3,
        name: "Frank",
        avatar: "https://cdn.pixabay.com/photo/2021/06/04/10/28/portrait-6309448_1280.jpg",
        email: "frank@example.com",
        bio: "Tech geek",
        followers: 1234,
        following: 567
    },
    {
        id: 4,
        name: "Eva",
        avatar: "https://media.istockphoto.com/id/1369508766/photo/beautiful-successful-latin-woman-smiling.jpg",
        email: "eva@example.com",
        bio: "Fashion designer",
        followers: 4567,
        following: 890
    },
    {
        id: 5,
        name: "Henry",
        avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
        email: "henry@example.com",
        bio: "Coffee addict",
        followers: 2345,
        following: 678
    }
];

export const mockPosts = [
    {
        postid: 1,
        user: mockUsers[0],
        content: "Chụp ảnh phong cảnh tuyệt đẹp! 📸",
        imgSrc: [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        ],
        likes: 234,
        comments: 45,
        createdAt: "2024-03-20T10:00:00Z"
    },
    {
        postid: 2,
        user: mockUsers[1],
        content: "Du lịch châu Âu 🌍",
        imgSrc: [
            "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
        ],
        likes: 456,
        comments: 78,
        createdAt: "2024-03-19T15:30:00Z"
    },
    {
        postid: 3,
        user: mockUsers[2],
        content: "Công nghệ mới nhất 2024! 💻",
        imgSrc: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        ],
        likes: 789,
        comments: 123,
        createdAt: "2024-03-18T09:15:00Z"
    },
    {
        postid: 4,
        user: mockUsers[3],
        content: "Bộ sưu tập mới nhất của tôi 👗",
        imgSrc: [
            "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        ],
        likes: 567,
        comments: 89,
        createdAt: "2024-03-17T14:45:00Z"
    },
    {
        postid: 5,
        user: mockUsers[4],
        content: "Cà phê sáng ☕",
        imgSrc: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        ],
        likes: 345,
        comments: 67,
        createdAt: "2024-03-16T08:30:00Z"
    }
];

export const mockFeatures = [
    {
        id: 1,
        title: "Trang cá nhân",
        icon: "👤",
        path: "/personal"
    },
    {
        id: 2,
        title: "Chat",
        icon: "💬",
        path: "/chat"
    },
    {
        id: 3,
        title: "Trang chính",
        icon: "🏠",
        path: "/"
    },
    {
        id: 4,
        title: "Lưu trữ",
        icon: "📑",
        path: "/saved"
    },
    {
        id: 5,
        title: "Cài đặt",
        icon: "⚙️",
        path: "/settings"
    }
];

export const mockFriends = [
    {
        id: 1,
        name: "David",
        avatar: "https://img.freepik.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg",
        status: "online",
        lastSeen: new Date().toISOString()
    },
    {
        id: 2,
        name: "Grace",
        avatar: "https://www.shutterstock.com/image-photo/smiling-cheerful-young-adult-african-600nw-1850821510.jpg",
        status: "offline",
        lastSeen: "2024-03-20T08:30:00Z"
    },
    {
        id: 3,
        name: "Frank",
        avatar: "https://cdn.pixabay.com/photo/2021/06/04/10/28/portrait-6309448_1280.jpg",
        status: "online",
        lastSeen: new Date().toISOString()
    },
    {
        id: 4,
        name: "Eva",
        avatar: "https://media.istockphoto.com/id/1369508766/photo/beautiful-successful-latin-woman-smiling.jpg",
        status: "online",
        lastSeen: new Date().toISOString()
    },
    {
        id: 5,
        name: "Henry",
        avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
        status: "offline",
        lastSeen: "2024-03-20T09:15:00Z"
    }
]; 