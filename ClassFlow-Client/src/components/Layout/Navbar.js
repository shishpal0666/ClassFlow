import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">{"{ ClassFlow }"}</div>
            <ul className="nav-links">
                <li>Home</li>
                <li>Profile</li>
                <li>Ask Question</li>
                <li>Answer Question</li>
                <li>Sign Up</li>
                {/* <li>Login</li> */}
                {/* <li>Logout</li> */}
            </ul>
        </nav>
    );
};

export default Navbar;
