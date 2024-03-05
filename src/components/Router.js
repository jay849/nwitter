import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <Route
                        path="/"
                        element={
                            <div
                                style={{
                                    maxWidth: 890,
                                    width: "100%",
                                    margin: "0 auto",
                                    marginTop: 80,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Home userObj={userObj} />
                            </div>
                        }
                    />
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
                <Route
                    path="/profile"
                    element={
                        <div
                            style={{
                                maxWidth: 890,
                                width: "100%",
                                margin: "0 auto",
                                marginTop: 80,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Profile refreshUser={refreshUser} userObj={userObj} />
                        </div>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
