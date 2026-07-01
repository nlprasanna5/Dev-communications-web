import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import ProfileView from "./ProfileView";

function Profile1() {
  const user = useSelector((store) => store.user);
  return (
    <div className="h-screen bg-base-200 overflow-scroll p-6">
     <ProfileView user={user} />
    </div>
  );
}

export default Profile1;
