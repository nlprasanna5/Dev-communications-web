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

      onLike();
    } else if (info.offset.x < -140) {
      await controls.start({
        x: -1000,
        rotate: -25,
        opacity: 0,
      });

      onIgnore();
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

  const likeOpacity = useTransform(x, [0, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, 0], [1, 0]);

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
      className="flex-shrink-0"
    >
      <div
        className={`relative w-full max-w-[450px] rounded-3xl overflow-hidden bg-base-100 border border-base-300 shadow-2xl ${
          preview ? "pointer-events-none" : ""
        }`}
      >
        {/* Image Section */}
        <div className="relative h-[580px] bg-gradient-to-br from-[#792CA2] via-[#6366F1] via-[#2C5EAD] to-[#792CA2] overflow-hidden">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

          {/* Match Badge */}
          <div className="absolute top-5 right-5">
            <span className="badge badge-primary badge-lg shadow-lg">
              ⚡ 92% Match
            </span>
          </div>

          {/* Profile Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Name */}
            <div className="flex items-center gap-2">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {firstName} {lastName}
              </h1>

              <BadgeCheck size={24} className="text-sky-400 flex-shrink-0" />
            </div>

            {/* Designation */}
            <p className="mt-2 flex items-center gap-2 text-lg font-medium opacity-95">
              <Building2 size={18} />

              <span className="truncate">
                {designation}
                {currentCompany && (
                  <span className="font-normal"> @ {currentCompany}</span>
                )}
              </span>
            </p>

            {/* Details */}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm opacity-90">
              <span className="flex items-center gap-1">
                <MapPin size={15} />
                {location}
              </span>

              <span>
                {gender} • {age} yrs
              </span>

              <span>{totalExperience} Experience</span>
            </div>

            {/* About */}
            {about && (
              <p className="mt-4 text-sm leading-6 opacity-90 line-clamp-3">
                {about}
              </p>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}

                {skills.length > 6 && (
                  <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs">
                    +{skills.length - 6}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-8 p-5 bg-base-100">
          <button
            onClick={onIgnore}
            className="btn btn-circle btn-error w-16 h-16 shadow-xl hover:scale-105 transition-transform"
          >
            <X size={28} />
          </button>

          <button className="btn btn-circle btn-info w-14 h-14 shadow-lg hover:scale-105 transition-transform">
            👀
          </button>

          <button
            onClick={onLike}
            className="btn btn-circle btn-success w-16 h-16 shadow-xl hover:scale-105 transition-transform"
          >
            <Heart size={26} fill="white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default UserCard;
