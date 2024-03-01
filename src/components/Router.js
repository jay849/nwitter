// import { useState } from "react";
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
// react-router-dom 버전 6.x에서 Switch 컴포넌트는 사용되지 않으며,
// Routes 컴포넌트를 사용하여 대체해야 한다.
// react-router-dom 버전 6.x에서 Redirect 컴포넌트는 사용되지 않으며,
// Navigate 컴포넌트를 사용하여 대체해야 한다.
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({isLoggedIn}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />   
                    </>
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
                {/* <Route exact path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
