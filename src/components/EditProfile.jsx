import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  //   const [skills, setSkills] = useState(user?.skills);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      console.log("response", response);
      dispatch(addUser(response?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log("patch", err?.data?.response);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center  gap-8 mx-4 ">
      <div className="flex justify-center  align-center  ">
        <div className="card bg-base-100 w-96 shadow-sm">
          <div className="card-body bg-gray-800   rounded-[10px]">
            <h2 className="card-title">Edit Profile</h2>

            <div className="flex flex-col  mt-4">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Firstname</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Lastname</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">age</legend>
                <input
                  type="number"
                  className="input validator"
                  required
                  placeholder="Type here"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Type here"
                />
              </fieldset>

              {/* <fieldset className="fieldset">
              <legend className="fieldset-legend">Skills</legend>
              <input
                type="text"
                className="input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Type here"
              />
            </fieldset> */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
            </div>

            <p className="text-red-500">{error}</p>

            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {user && (
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      )}

      {showToast && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
