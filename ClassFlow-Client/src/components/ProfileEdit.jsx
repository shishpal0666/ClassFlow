import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [firstName, setFirstName] = useState(user?.data?.firstname || "");
  const [lastName, setLastName] = useState(user?.data?.lastname || "");
  const [age, setAge] = useState(user?.data?.age || "");
  const [gender, setGender] = useState(user?.data?.gender || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSaveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        SERVER_URL + "/profile/edit",
        {
          firstname: firstName,
          lastname: lastName,
          age: age,
          gender: gender,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser({
        ...user,
        data: res?.data?.data
      }));
      
      setShowToast(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile");
    }
  };

  return (
    user && (
      <div className="flex flex-col min-h-screen p-6 sm:p-8 bg-gray-800 text-white">
        <div className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-lg relative">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 text-center">
            Edit {user?.data?.firstname}'s Profile
          </h3>
          {error && (
            <div className="bg-red-100 my-2 border-l-4 border-red-500 text-red-800 px-4 py-2 rounded-lg shadow-sm">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          <div className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-between">
              <label
                htmlFor="firstname"
                className="text-sm sm:text-lg font-medium text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="text-sm sm:text-lg p-3 bg-gray-600 text-gray-100 rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between">
              <label
                htmlFor="lastname"
                className="text-sm sm:text-lg font-medium text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="text-sm sm:text-lg p-3 bg-gray-600 text-gray-100 rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between">
              <label
                htmlFor="age"
                className="text-sm sm:text-lg font-medium text-gray-300"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-sm sm:text-lg p-3 bg-gray-600 text-gray-100 rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between">
              <label
                htmlFor="gender"
                className="text-sm sm:text-lg font-medium text-gray-300"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="text-sm sm:text-lg p-3 bg-gray-600 text-gray-100 rounded-lg"
              >
                <option value="none">None</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <NavLink
                to="/profile"
                className="text-sm sm:text-lg text-blue-400 hover:text-blue-500"
              >
                Back
              </NavLink>

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={age <= 0 || isNaN(age)}
                className={`py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition 
                            ${
                              age <= 0 || isNaN(age)
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
              >
                Save Changes
              </button>
            </div>
          </div>
          
          {showToast && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-lg shadow-md">
                <span>Profile saved successfully!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ProfileEdit;