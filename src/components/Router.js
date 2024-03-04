import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({isLoggedIn, userObj}) => {

    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj} />} />
                        <Route path="/profile" element={<Profile userObj = {userObj} />} />
                    </>
                    
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
                <Route exact path="*" element={<Navigate to="/" replace />} />
            </Routes>

        </Router>
    );
};

export default AppRouter;