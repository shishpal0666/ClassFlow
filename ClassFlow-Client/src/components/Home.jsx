import { NavLink } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-900">
      <div className="mockup-window bg-gray-800 mt-20 border border-gray-700 shadow-lg p-8 w-full max-w-2xl">
        <div className="grid place-content-center text-xl font-semibold text-white">
          Hello!
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white mt-8">
        Welcome to <span className="text-blue-600">ClassFlow!</span>
      </h1>
      <p className="text-gray-400 mt-2 text-lg">
        The best place to engage, learn, and grow.
      </p>

      {!user ? (
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
      ) : (
        <div className="mt-6 flex gap-4">
          <NavLink
            to="/new/question"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            New Question
          </NavLink>

          <NavLink
            to="/answer/submit"
            className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Answer
          </NavLink>

          <NavLink
            to="/question/:quesId"
            className="px-6 py-3 bg-red-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-red-700 transition"
          >
            View Q&A
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Home;
