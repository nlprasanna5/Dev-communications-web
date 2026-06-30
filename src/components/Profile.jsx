import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

function Profile() {
  const user = useSelector((store) => store.user);
  return (
    <div className="h-screen overflow-scroll my-10">
      <EditProfile user={user} />
    </div>
  );
}

export default Profile;
