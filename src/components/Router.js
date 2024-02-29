// import { useState } from "react";
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
// react-router-dom 버전 6.x에서 Switch 컴포넌트는 사용되지 않으며,
// Routes 컴포넌트를 사용하여 대체해야 한다.
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import Auth from "../routes/Auth";
// import Home from "../routes/Home";
import Auth from "routes/Auth";
import Home from "routes/Home";

const AppRouter = ({isLoggedIn}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <Route path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
