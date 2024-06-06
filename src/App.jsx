import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/header";
import LoginPage from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Loading from "./pages/Loadding";

const HomePage = lazy(() => import("./pages/Home"));
const Projector = lazy(() => import("./pages/Projector"));
const NewsPage = lazy(() => import("./pages/News"));
const Personal = lazy(() => import("./pages/Personal"));

const App = () => {
    const menu = [
        { text: "Thảo luận", path: "/", component: HomePage },
        { text: "Promo", path: "/projector", component: Projector },
        { text: "Tin tức", path: "/news", component: NewsPage },
        { text: "Trang cá nhân", path: "/personal", component: Personal },
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
