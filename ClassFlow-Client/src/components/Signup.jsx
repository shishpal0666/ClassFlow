import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if(user){
      navigate("/");
    }
  },[navigate, user]);


  const handleSignup = async () => {
    try {
      const res = await axios.post(
        SERVER_URL + "/sign-up",
        {
          firstname: firstname,
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      setErrorMessage("");
      navigate("/");
    } catch (err) {
      console.error("Error during login:", err.response?.data || err.message);
      setErrorMessage(
        err.response?.data ||
          "An error occurred during login. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="card text-neutral-content w-96 bg-[#000000] p-6 max-h-[90vh] ">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-3">Sign up</h2>
          <div className="w-full max-w-xs">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-amber-50 my-2">
                  First Name
                </span>
              </div>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="w-full max-w-xs">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-amber-50 my-2">
                  Email Address
                </span>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="w-full max-w-xs">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-amber-50 my-2">Password</span>
              </div>
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full" />
            </label>
          </div>
          <button onClick={handleSignup} className="btn btn-primary w-full max-w-xs my-4 mt-7">
            Sign Up
          </button>

          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-800 px-4 py-2 rounded-lg shadow-sm">
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          <div className="w-full my-4 border-t border-gray-600"></div>
          <div className="label">
            <span className="label-text text-amber-50">Existing User?</span>
          </div>
          <NavLink
            to="/login"
            className="btn btn-outline btn-secondary w-full max-w-xs"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
