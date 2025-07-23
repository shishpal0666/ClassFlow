import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import AuthRedirect from "./AuthRedirect";
import WelcomeCard from "./WelcomeCard";
import Toast from "./Toast"; 
const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [quesCode, setQuesCode] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); 
  let toastTimeoutId = null; 
  
  useEffect(() => {
    return () => {
      if (toastTimeoutId) {
        clearTimeout(toastTimeoutId); 
      }
    };
  });
  
  if (!user) return <AuthRedirect />;

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId); 
    }

    toastTimeoutId = setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
      setToastType("");
    }, 3000); 
  };

  const handleAns = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/question/view/${quesCode}`, {
        withCredentials: true,
      });

      if (response?.data?.data?.question) {
        navigate(`/answer/${quesCode}`);
        showToastMessage("Question viewed successfully!", "success");
      } else {
        showToastMessage("Question not found or invalid code!", "error");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "There was an error while fetching the question!";
      showToastMessage(errorMessage, "error");
    }
  };

  const handleviewQA = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/question/view/${quesCode}`, {
        withCredentials: true,
      });

      if (res?.data?.data?.question) {
        if (res?.data?.data?.question?.fromUserId === user?.data?._id) {
          navigate(`/question/view/${quesCode}`);
          showToastMessage("Question viewed successfully!", "success");
        } else {
          showToastMessage("You are not authorized to view this Q&A.", "error");
        }
      } else {
        showToastMessage("Question not found or invalid code!", "error");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "There was an error while fetching the question!";
      showToastMessage(errorMessage, "error");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-900">
      {showToast && <Toast message={toastMessage} type={toastType} />}
      <WelcomeCard />
      <div className="mt-6 flex flex-col gap-4">
        <NavLink
          to="/new/question"
          className="py-2 flex items-center justify-center bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <div> New Question</div>
        </NavLink>

        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Question Code"
            value={quesCode}
            onChange={(e) => setQuesCode(e.target.value)}
            className="m-4 input input-bordered w-full"
          />
          <div className="flex flex-row justify-between">
            <button
              onClick={handleAns}
              className="btn m-2 px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Answer
            </button>

            <button
              onClick={handleviewQA}
              className="btn m-2 px-6 py-3 bg-red-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-700 transition"
            >
              View Q&A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
