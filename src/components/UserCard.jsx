import { BadgeCheck, MapPin, Building2, Heart, X } from "lucide-react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {} from "lucide-react";

function UserCard({ user = {}, onLike, onIgnore, preview }) {
  const {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    designation,
    currentCompany,
    location,
    totalExperience,
    skills = [],
  } = user;
  console.log("user", user);

  const controls = useAnimation();

  const x = useMotionValue(0);

  // Rotate according to horizontal movement
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);

  // Optional: make it slightly smaller while dragging
  const scale = useTransform(x, [-250, 0, 250], [0.95, 1, 0.95]);

  async function handleDragEnd(_, info) {
    if (info.offset.x > 140) {
      await controls.start({
        x: 1200,
        opacity: 0,
        transition: {
          duration: 0.35,
        },
      });

      onLike("interested", user?._id);
    } else if (info.offset.x < -140) {
      await controls.start({
        x: -1000,
        rotate: -25,
        opacity: 0,
      });

      onIgnore("ignored", user?._id);
    } else {
      controls.start({
        x: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 30,
        },
      });
    }
  }

  return (
    <motion.div
      drag={preview ? false : "x"}
      style={{
        x,
        rotate,
        scale,
      }}
      animate={controls}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      whileTap={preview ? {} : { cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
      whileHover={{
        scale: 1.01,
      }}
      className="flex-shrink-0 w-full"
    >
      <div
        className={`relative w-full max-w-[92vw] sm:max-w-[420px] lg:max-w-[450px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-base-100 border border-base-300 shadow-2xl ${
          preview ? "pointer-events-none" : ""
        }`}
      >
        {/* Image Section */}
        <div className="relative h-[400px] sm:h-[480px] lg:h-[580px] bg-gradient-to-br from-[#792CA2] via-[#6366F1] via-[#2C5EAD] to-[#792CA2] overflow-hidden">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

          {/* Match Badge */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
            <span className="badge badge-primary badge-sm sm:badge-lg shadow-lg">
              ⚡ 92% Match
            </span>
          </div>

          {/* Profile Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 text-white">
            {/* Name */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold leading-tight truncate">
                {firstName} {lastName}
              </h1>

              <BadgeCheck
                size={20}
                className="text-sky-400 flex-shrink-0 sm:w-6 sm:h-6"
              />
            </div>

            {/* Designation */}
            {designation && currentCompany && (
              <p className="mt-1.5 sm:mt-2 flex items-center gap-2 text-sm sm:text-base lg:text-lg font-medium opacity-95">
                <Building2
                  size={16}
                  className="flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                />

                <span className="truncate">
                  {designation}
                  {currentCompany && (
                    <span className="font-normal"> @ {currentCompany}</span>
                  )}
                </span>
              </p>
            )}

            {/* Details */}
            {location ||
              gender ||
              age ||
              (totalExperience && (
                <div className="mt-2 sm:mt-3 flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm opacity-90">
                  {location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="sm:w-[15px] sm:h-[15px]" />
                      {location}
                    </span>
                  )}

                  {gender && age && (
                    <span>
                      {gender} • {age} yrs
                    </span>
                  )}

                  {totalExperience && <span>{totalExperience} Experience</span>}
                </div>
              ))}

            {/* About */}
            {about && (
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm leading-5 sm:leading-6 opacity-90 line-clamp-2 sm:line-clamp-3">
                {about}
              </p>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div className="mt-2.5 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}

                {skills.length > 6 && (
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs">
                    +{skills.length - 6}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-5 sm:gap-6 lg:gap-8 p-3.5 sm:p-4 lg:p-5 bg-base-100">
          <button
            onClick={() => onIgnore("ignored", user._id)}
            className="btn btn-circle btn-error w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-xl hover:scale-105 transition-transform"
          >
            <X size={22} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </button>

          <button className="btn btn-circle btn-info w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shadow-lg hover:scale-105 transition-transform text-base sm:text-lg">
            👀
          </button>

          <button
            onClick={() => onLike("interested", user._id)}
            className="btn btn-circle btn-success w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-xl hover:scale-105 transition-transform"
          >
            <Heart
              size={20}
              fill="white"
              className="sm:w-6 sm:h-6 lg:w-[26px] lg:h-[26px]"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default UserCard;
