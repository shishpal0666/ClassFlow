import { NavLink } from "react-router"; 
import { useSelector } from "react-redux";
import ProfileView from "../components/ProfileView";
import AuthRedirect from "./AuthRedirect";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) return( <AuthRedirect />);
  
  return (
    <div>
      <ProfileView user={user} />
    </div>
  );
};

export default Profile;
