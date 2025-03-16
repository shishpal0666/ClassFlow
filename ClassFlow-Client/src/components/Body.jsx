import { Outlet } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import Navbar from "./Navbar";
import Dock from "./Dock";
import Footer from "./Footer";

const Body = () => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(SERVER_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res?.data);
    } catch (err) {
      console.error('Error during login:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <Outlet />
      <Dock />
      <Footer />
    </div>
  );
};

export default Body;
