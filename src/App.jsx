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

const App = () => {
    const menu = [
        { text: "Thảo luận", path: "/", component: HomePage },
        { text: "Tin tức", path: "/news", component: NewsPage },
        { text: "Trang cá nhân", path: "/personal", component: Personal },
        { text: "Chat", path: "/chat", component: Chat },
        { text: "Lưu trữ", path: "/saved", component: Saved },
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
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
