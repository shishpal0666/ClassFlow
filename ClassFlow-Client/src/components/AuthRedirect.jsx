import { NavLink } from "react-router";
import WelcomeCard from "./WelcomeCard";

const AuthRedirect = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-900">
      <WelcomeCard />
      <div className="mt-6 flex gap-4">
        <NavLink
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Login
        </NavLink>
        <NavLink
          to="/sign-up"
          className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default AuthRedirect;
