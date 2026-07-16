import axios from "axios";
import {
  BadgeCheck,
  MessageCircle,
  MoreVertical,
  ChevronDown,
} from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "../utils/connectionSlice";
import { useEffect } from "react";
import { Link } from "react-router";

export default function ConnectionsPage() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const onlineUsers = useSelector((store) => store.onlineUsers);

  // const isOnline = onlineUsers.includes(connection._id);
  async function connectionList() {
    try {
      const result = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log("all", result?.data?.data);

      dispatch(getConnections(result?.data?.data));
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  }

  console.log("connections", connections);

  useEffect(() => {
    connectionList();
  }, []);

  return connections?.length === 0 ? (
    <div className="py-24 flex flex-col items-center">
      <div className="text-7xl">🤝</div>

      <h2 className="text-2xl font-bold mt-5">No Connections Yet</h2>

      <p className="text-base-content/60 mt-2 text-center max-w-md">
        Start connecting with developers. Your accepted connections will appear
        here.
      </p>
    </div>
  ) : (
    <div className="mx-auto max-w-6xl bg-base-100 shadow-xl overflow-hidden my-6">
      <div className="m-2 max-w-7xl rounded-2xl border border-base-300 bg-base-100 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-base-300 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">My Connections</h1>

              <p className="text-sm text-base-content/60 mt-1">
                Developers you're connected with.
              </p>
            </div>

            <div className="badge badge-primary badge-lg">
              {connections?.length || 0} Connected
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="divide-y divide-base-300">
          {connections?.map((user) => (
            <div
              key={user._id}
              className="px-4 py-5 sm:px-6 lg:px-8 hover:bg-base-200 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Left */}
                <div className="flex gap-4 flex-1 min-w-0">
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-base-300 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    {/* Name */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold truncate">
                        {user.firstName}
                      </h2>

                    

                      <span className="badge badge-success badge-sm">
                        Connected
                      </span>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            onlineUsers.includes(user?._id)
                              ? "bg-green-500 animate-pulse"
                              : "bg-gray-400"
                          }`}
                        ></span>

                        <span
                          className={`text-sm font-medium ${
                            onlineUsers.includes(user?._id)
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          {onlineUsers.includes(user?._id)
                            ? "Online"
                            : "Offline"}
                        </span>
                      </div>
                    </div>

                    {/* Role */}
                    {user?.designation && (
                      <p className="text-sm text-base-content/70 mt-1">
                        {user.designation}
                      </p>
                    )}

                    {/* Details */}
                    {user?.gender ||
                      user?.age ||
                      (user?.location && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs sm:text-sm text-base-content/60">
                          {user?.gender && (
                            <span>{user.gender?.toUpperCase()}</span>
                          )}

                          {user?.age && <span>{user.age} Years</span>}

                          {user.location && <span>📍 {user.location}</span>}
                        </div>
                      ))}

                    {/* About */}
                    {user.about && (
                      <p className="mt-3 text-sm text-base-content/80 line-clamp-2">
                        {user.about}
                      </p>
                    )}

                    {/* Skills */}
                    {user?.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {user.skills?.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="badge badge-outline badge-primary"
                          >
                            {skill}
                          </span>
                        ))}

                        {user.skills?.length > 5 && (
                          <span className="badge badge-neutral">
                            +{user.skills.length - 5}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="
            flex
            flex-col
            sm:flex-row
            lg:flex-col
            gap-3
            w-full
            lg:w-auto
          "
                >
                  <Link
                    className="btn btn-primary lg:w-40"
                    to={`/chat/${user?._id}`}
                  >
                    <MessageCircle size={18} />
                    Message
                  </Link>

                  <button className="btn btn-outline lg:w-40">
                    <MoreVertical size={18} />
                    Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center py-6">
          <button className="btn btn-ghost text-primary gap-2">
            Load More
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
