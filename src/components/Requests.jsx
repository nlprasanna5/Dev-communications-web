import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { BadgeCheck, ChevronDown } from "lucide-react";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.requests);

  async function fetchRequests() {
    try {
      const result = await axios.get(
        BASE_URL + "/user/requests/received",

        {
          withCredentials: true,
        },
      );

      dispatch(addRequests(result?.data?.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log("final", requests);

  return requests?.length === 0 ? (
    <div className="py-24 flex flex-col items-center text-center px-4">
      <div className="text-7xl">👋</div>

      <h2 className="text-2xl font-bold mt-5">Nothing Here Yet</h2>

      <p className="text-base-content/60 mt-2 max-w-md">
        Your incoming connection requests will appear here once developers reach
        out.
      </p>
    </div>
  ) : (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl rounded-2xl border border-base-300 bg-base-100 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-base-300 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Requests</h1>

              <p className="text-sm text-base-content/60 mt-1">
                Developers who want to connect with you
              </p>
            </div>

            <div className="badge badge-primary badge-lg self-start sm:self-auto">
              {requests?.length || 0} Requests
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="divide-y divide-base-300">
          {requests?.map((user) => {
            const profile = user.fromUserId;

            return (
              <div
                key={profile._id}
                className="px-4 py-5 sm:px-6 lg:px-8 hover:bg-base-200 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Left Section */}
                  <div className="flex gap-4 flex-1 min-w-0">
                    <img
                      src={profile.photoUrl}
                      alt={profile.firstName}
                      className="
                w-16 h-16
                sm:w-20 sm:h-20
                rounded-2xl
                object-cover
                border border-base-300
                flex-shrink-0
              "
                    />

                    <div className="flex-1 min-w-0">
                      {/* Name */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-lg sm:text-xl truncate">
                          {profile.firstName}
                        </h2>

                        <BadgeCheck
                          size={18}
                          className="text-primary fill-primary shrink-0"
                        />

                        <span className="badge badge-success badge-sm">
                          Interested
                        </span>
                      </div>

                      {/* Designation */}
                      <p className="mt-1 text-sm text-base-content/70">
                        {profile.designation}
                      </p>

                      {/* Details */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs sm:text-sm text-base-content/60">
                        <span>{profile.gender?.toUpperCase()}</span>

                        <span>{profile.age} Years</span>

                        {profile.location && <span>📍 {profile.location}</span>}
                      </div>

                      {/* About */}
                      <p className="mt-3 text-sm text-base-content/80 line-clamp-2">
                        {profile.about}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {profile.skills?.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="badge badge-outline badge-primary"
                          >
                            {skill}
                          </span>
                        ))}

                        {profile.skills?.length > 4 && (
                          <span className="badge badge-neutral">
                            +{profile.skills.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                    <button
                      className="
                btn
                btn-outline
                btn-error
                flex-1
                lg:w-36
              "
                    >
                      Ignore
                    </button>

                    <button
                      className="
                btn
                btn-primary
                flex-1
                lg:w-36
              "
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

export default Requests;
