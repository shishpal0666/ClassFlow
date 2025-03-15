import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Dock from "./Dock";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Outlet />
      <Dock/>
      {/* <Footer /> */}
    </div>
  );
};

export default Body;