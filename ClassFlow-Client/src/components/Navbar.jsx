import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">ClassFlow</div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>Profile</li>
        <li>Ask Question</li>
        <li>Answer Question</li>
        <li>
          <NavLink to="/sign-up">Sign Up</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
