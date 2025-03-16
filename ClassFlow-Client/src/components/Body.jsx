import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Navbar from "./Navbar";
import Dock from "./Dock";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  const navigate = useNavigate();

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(SERVER_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      console.log(res.data);
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error("Error during login:", err.response?.data || err.message);
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
