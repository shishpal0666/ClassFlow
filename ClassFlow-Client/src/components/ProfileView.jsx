import { NavLink } from "react-router";

const Profileview = ({ user }) => {
  const { firstname, lastname, emailId, age, gender, createdAt } =
    user?.data || {};

  return (
    <div className="flex flex-col min-h-screen p-6 sm:p-8 bg-gray-800 text-white">
      <div className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="bg-gray-600 p-6 sm:p-8 rounded-lg shadow-md">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">
            {firstname}'s Profile
          </h3>
          <dl className="space-y-4 sm:space-y-5 mt-4 sm:mt-6">
            <div className="flex justify-between flex-col sm:flex-row">
              <dt className="text-sm sm:text-lg font-medium text-gray-300">
                Full Name
              </dt>
              <dd className="text-sm sm:text-lg text-gray-100">
                {firstname} {lastname}
              </dd>
            </div>
            <div className="flex justify-between flex-col sm:flex-row">
              <dt className="text-sm sm:text-lg font-medium text-gray-300">
                Email
              </dt>
              <dd className="text-sm sm:text-lg text-gray-100">{emailId}</dd>
            </div>
            <div className="flex justify-between flex-col sm:flex-row">
              <dt className="text-sm sm:text-lg font-medium text-gray-300">
                Age
              </dt>
              <dd className="text-sm sm:text-lg text-gray-100">{age}</dd>
            </div>
            <div className="flex justify-between flex-col sm:flex-row">
              <dt className="text-sm sm:text-lg font-medium text-gray-300">
                Gender
              </dt>
              <dd className="text-sm sm:text-lg text-gray-100">{gender}</dd>
            </div>
            <div className="flex justify-between flex-col sm:flex-row">
              <dt className="text-sm sm:text-lg font-medium text-gray-300">
                Member Since
              </dt>
              <dd className="text-sm sm:text-lg text-gray-100">
                {new Date(createdAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-600 mt-6 sm:mt-8 p-6 sm:p-8 rounded-lg shadow-md">
          <h4 className="text-lg sm:text-xl font-semibold text-gray-100 text-center">
            Questions Asked
          </h4>
          <p className="text-sm sm:text-lg text-gray-400 text-center">
            Comming Soon ...
          </p>
        </div>

        <div className="flex justify-end mt-6 sm:mt-8">
          <NavLink
            to="/profile/edit"
            className="bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profileview;
