import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Profileview = ({ user }) => {
  const { firstname, lastname, emailId, age, gender, createdAt } = user?.data || {};

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <strong>First Name:</strong> {firstname || "Not Available"}
        </div>
        <div className="profile-item">
          <strong>Last Name:</strong> {lastname || "Not Available"}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {emailId || "Not Available"}
        </div>
        <div className="profile-item">
          <strong>Age:</strong> {age || "Not Available"}
        </div>
        <div className="profile-item">
          <strong>Gender:</strong> {gender || "Not Available"}
        </div>
        <div className="profile-item">
          <strong>Account Created:</strong> {new Date(createdAt).toLocaleDateString() || "Not Available"}
        </div>
      </div>
      <NavLink to="/logout" className="btn logout-btn">
        Logout
      </NavLink>
    </div>
  );
};


const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    user && (
      <div className="profile-page">
        <Profileview user={user} />
      </div>
    )
  );
};

export default Profile;
