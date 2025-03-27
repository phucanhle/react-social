import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/header";
import LoginPage from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Loading from "./pages/Loadding";

const HomePage = lazy(() => import("./pages/Home"));
const NewsPage = lazy(() => import("./pages/News"));
const Personal = lazy(() => import("./pages/Personal"));
const Chat = lazy(() => import("./pages/Chat"));
const Saved = lazy(() => import("./pages/Saved"));
const Settings = lazy(() => import("./pages/Settings"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Friends = lazy(() => import("./pages/Friends"));
const Events = lazy(() => import("./pages/Events"));
const Search = lazy(() => import("./pages/Search"));

const App = () => {
    const menu = [
        { text: "Thảo luận", path: "/", component: HomePage },
        { text: "Tin tức", path: "/news", component: NewsPage },
        { text: "Thông báo", path: "/notifications", component: Notifications },
        { text: "Bạn bè", path: "/friends", component: Friends },
        { text: "Chat", path: "/chat", component: Chat },
        { text: "Sự kiện", path: "/events", component: Events },
        { text: "Tìm kiếm", path: "/search", component: Search },
        { text: "Đã lưu", path: "/saved", component: Saved },
        { text: "Cài đặt", path: "/settings", component: Settings },
    ];

    return (
        <BrowserRouter>
            <Header />
            <Suspense fallback={<Loading />}>
                <Routes>
                    {menu.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={
                                <PrivateRoute>
                                    <item.component />
                                </PrivateRoute>
                            }
                        />
                    ))}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/personal" element={
                        <PrivateRoute>
                            <Personal />
                        </PrivateRoute>
                    } />
                    <Route path="/user/:id" element={
                        <PrivateRoute>
                            <UserProfile />
                        </PrivateRoute>
                    } />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
