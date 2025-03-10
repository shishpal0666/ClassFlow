import React from "react";

const Footer = () => {
    const date = new Date();
    let year = date.getFullYear();
    return (
        <div className="footer">
            <p>&copy; {year} ClassFlow. All rights reserved.</p>
        </div>
    );
};

export default Footer;
