import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { SERVER_URL } from "../utils/constants";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(
          SERVER_URL + "/logout",
          {},
          {
            withCredentials: true,
          }
        );
        dispatch(removeUser());

        navigate("/");
      } catch (err) {
        console.error(
          "Error during logout:",
          err.response?.data || err.message
        );

        setErrorMessage(
          err.response?.data ||
            "An error occurred during logout. Please try again."
        );
      }
    };

    handleLogout();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-105">
        {errorMessage ? (
          <div className="bg-red-50 border-l-4 border-red-600 text-red-700 px-6 py-3 rounded-lg shadow-md mb-6">
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">
              Logging you out...
            </p>
            <p className="mt-3 text-gray-600">
              Please wait while we log you out.
            </p>
            <div className="mt-6">
              <div className="animate-spin h-8 w-8 border-4 border-t-4 border-gray-500 rounded-full mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
