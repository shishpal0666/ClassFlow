import { NavLink } from "react-router";

const Signup = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="card text-neutral-content w-96 bg-[#000000] p-6 max-h-[90vh] overflow-y-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-3">Sign up</h2>
          <div className="w-full max-w-xs">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-amber-50 my-2">First Name</span>
              </div>
              <input type="text" className="input input-bordered w-full" />
            </label>
          </div>
          <div className="w-full max-w-xs">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-amber-50 my-2">Email Address</span>
              </div>
              <input type="email" className="input input-bordered w-full" />
            </label>
          </div>
          <div className="w-full max-w-xs">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-amber-50 my-2">Password</span>
              </div>
              <input type="password" className="input input-bordered w-full" />
            </label>
          </div>
          <button className="btn btn-primary w-full max-w-xs my-4 mt-7">
            Sign Up
          </button>
          <div className="w-full my-4 border-t border-gray-600"></div>
          <div className="label">
            <span className="label-text text-amber-50">Existing User?</span>
          </div>
          <NavLink to="/login" className="btn btn-outline btn-secondary w-full max-w-xs">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;