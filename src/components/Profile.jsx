import {
  MapPin,
  BriefcaseBusiness,
  UserRound,
  MailCheck,
  CodeXml,
  Presentation,
  CircleCheckBig,
  CircleX,
  UserStar,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProfileStrengthLabel } from "../utils/helperFunctions";
import { addUser } from "../utils/userSlice";

function Profile() {
  const navigate = useNavigate();
  // const user = useSelector((store) => store?.user);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [connections, setConnections] = useState([]);
  const onlineUsers = useSelector((store) => store?.onlineUsers);
  const { connectionId } = useParams();

  async function connectionList() {
    try {
      const result = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log("all", result?.data?.data);

      setConnections(result?.data?.data?.slice(0, 3));
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  }

  console.log("connections", connections);

  useEffect(() => {
    connectionList();
  }, []);

  async function getConnectedUserDetails() {
    try {
      const result = await axios.get(
        `${BASE_URL}/profile/view/${connectionId}`,
        {
          withCredentials: true,
        },
      );

      setUser(result?.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getProfileDetails() {
    try {
      const result = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      setUser(result?.data);
      dispatch(addUser(result?.data?.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (connectionId) {
      getConnectedUserDetails();
    } else {
      getProfileDetails();
    }
  }, [connectionId]);

  function handleEdit() {
    navigate("/profile/edit");
  }

  return (
    // <main className="h-screen  flex gap-6 ">
    <main className="min-h-screen flex flex-col xl:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* left section */}
      <section className="flex flex-col flex-[2] gap-6 w-full">
        {/* Top Section */}
        <article className="flex flex-col lg:flex-row lg:justify-between gap-6 p-4 md:p-6 bg-gradient-to-br from-[#17433F] via-[#05152C] to-[#408175] border border-base-300 rounded-lg">
          {/* Profile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
            <figure className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full shrink-0">
              <img
                src={user?.data?.photoUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </figure>

            <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-primary-content">
                  {user?.data?.firstName} {user?.data?.lastName}
                </h2>

                <p className="text-secondary-content">
                  {user?.data?.designation}
                </p>
              </div>

              {user?.data?.gender ||
                user?.data?.age ||
                user?.data?.location ||
                (user?.data?.totalExperience && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                    {user?.data?.gender && user?.data?.age && (
                      <p className="text-primary-content flex items-center gap-1">
                        <UserStar size={16} />
                        {user?.data?.gender?.toUpperCase()}
                        {" - "}
                        {user?.data?.age}Y
                      </p>
                    )}

                    {user?.data?.location && (
                      <p className="text-primary-content flex items-center gap-1">
                        <MapPin size={16} />
                        {user?.data?.location}
                      </p>
                    )}

                    {user?.data?.totalExperience && (
                      <p className="text-primary-content flex items-center gap-1">
                        <BriefcaseBusiness size={16} />
                        {user?.data?.totalExperience} years of Experience
                      </p>
                    )}
                  </div>
                ))}

              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {Object.entries(user?.data?.socialLinks || {}).map(
                  ([name, url]) => {
                    if (!url) return null;

                    return (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-base-300 rounded-md px-3 py-2 text-xs text-secondary-content hover:bg-base-100/10 transition"
                      >
                        {url}
                      </a>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="self-center lg:self-start">
            <button
              className="btn btn-primary w-full sm:w-auto whitespace-nowrap"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          </div>
        </article>

        {/* Bottom Section */}
        <article className="flex flex-col xl:flex-row gap-6">
          {/* Left Column */}
          <div className="flex flex-col flex-[2] gap-6">
            {/* About */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-4 md:p-6 flex flex-col gap-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-base-content">
                <UserRound className="text-primary" size={18} />
                About
              </h3>

              <p className="text-base-content leading-7">{user?.data?.about}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="border border-base-300 rounded-md px-3 py-2 text-sm">
                  <MailCheck size={16} className="inline-block mr-2" />
                  {user?.data?.emailId}
                </div>

                <div className="border border-base-300 rounded-md px-3 py-2 text-sm">
                  <MapPin size={16} className="inline-block mr-2" />
                  {user?.data?.location}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-4 md:p-6 flex flex-col gap-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-base-content">
                <CodeXml className="text-primary" size={18} />
                Skills
              </h3>

              <ul className="flex flex-wrap gap-3">
                {user?.data?.skills?.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1 rounded-full border border-base-300 text-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="bg-base-100 border border-base-300 rounded-lg p-4 md:p-6 flex flex-col gap-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-base-content">
                <BriefcaseBusiness className="text-primary" size={18} />
                Experience
              </h3>

              <ul className="steps steps-vertical">
                {user?.data?.experience?.map((exp) => (
                  <li key={exp._id} className="step step-primary text-left">
                    <div>
                      <p className="font-semibold">{exp.role}</p>

                      <p className="text-sm opacity-70">
                        {exp.company}
                        {" ,"} {exp.duration}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 bg-base-100 border border-base-300 rounded-lg p-4 md:p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-base-content mb-5">
              <Presentation className="text-primary" size={18} />
              Projects
            </h3>

            <ul className="flex flex-col gap-4">
              {user?.data?.projects?.map((project) => (
                <li
                  key={project._id}
                  className="bg-base-200 rounded-lg p-4 flex flex-col gap-3"
                >
                  <h4 className="font-semibold text-primary text-lg">
                    {project.title}
                  </h4>

                  <p className="text-sm text-base-content leading-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project?.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded border border-base-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary"
                  >
                    View Project
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* right section */}

      <section className="flex flex-col flex-1 gap-6 w-full">
        {/* Profile Strength */}
        <div className="bg-base-100 border border-base-300 rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold text-base-content mb-6">
            Profile Strength
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
            <div
              className="radial-progress text-primary"
              style={{ "--value": user?.strengthDetails?.profileStrength }}
              aria-valuenow={user?.strengthDetails?.profileStrength}
              role="progressbar"
            >
              {user?.strengthDetails?.profileStrength}
            </div>

            <div className="w-full sm:flex-1">
              <progress
                className="progress progress-success w-full"
                value={user?.strengthDetails?.profileStrength || 0}
                max="100"
              ></progress>

              <p className="mt-2 text-center sm:text-left text-sm font-medium text-success">
                {getProfileStrengthLabel(
                  user?.strengthDetails?.profileStrength || 0,
                )}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {user?.strengthDetails?.missingFields?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-base-300 p-3"
              >
                <div className="text-[red]">
                  <CircleX />
                </div>

                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connections */}
        {!connectionId && (
          <div className="bg-base-100 border border-base-300 rounded-lg p-4 md:p-6">
            <h2 className="text-lg font-semibold text-base-content mb-5">
              Connections
            </h2>

            <div className="flex flex-col gap-4">
              {connections.map((connection) => (
                <div
                  key={connection?._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg bg-base-200 p-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={connection?.photoUrl}
                      alt={connection._id}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {connection?.firstName}
                      </p>

                      <p className="text-sm text-base-content/70 truncate">
                        {connection?.designation}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`badge self-start sm:self-center ${
                      onlineUsers?.includes(connection?._id)
                        ? "badge-success"
                        : "badge-neutral"
                    }`}
                  >
                    {connection.status}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-outline btn-primary w-full mt-6"
              onClick={() => navigate("/connections")}
            >
              View All Connections
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
