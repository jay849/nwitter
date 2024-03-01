import {Link} from "react-router-dom";

const Navigation = () => {
    // return <nav>This is Navigation!</nav>;
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">My Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;