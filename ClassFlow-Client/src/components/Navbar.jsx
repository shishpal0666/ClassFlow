import React from "react";
import { NavLink } from "react-router"; 

const Navbar = () => {
  return (
    <nav className="bg-[#000000] fixed top-0 left-0 w-full z-50">
      <div className="navbar shadow-sm flex justify-center items-center py-4">
        <div>
          <NavLink to="/" className="logo text-[#ffffff] text-4xl">
            {"{ ClassFlow }"}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
