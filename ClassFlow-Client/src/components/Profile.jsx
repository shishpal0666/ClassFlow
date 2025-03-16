import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Profileview from "../components/ProfileView";


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
