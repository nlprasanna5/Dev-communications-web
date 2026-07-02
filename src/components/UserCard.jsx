import { BadgeCheck, MapPin, Building2, Heart, X } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
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
    socialLinks = {},
  } = user;
  console.log("user", user);

  const controls = useAnimation();

  async function handleDragEnd(_, info) {
    if (info.offset.x > 140) {
      await controls.start({
        x: 1000,
        rotate: 25,
        opacity: 0,
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
        rotate: 0,
      });
    }
  }

  return (
    <motion.div
      drag="x"
      animate={controls}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      whileTap={preview ? {} : { cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
      whileHover={{
        scale: 1.01,
      }}
    >
      <div className={`relative w-full max-w-4xl rounded-3xl overflow-hidden bg-base-100 border border-base-300 shadow-2xl ${
    preview ? "pointer-events-none" : ""
  }`}>
        {/* Image */}

        <div className="relative h-[520px] bg-gradient-to-br from-[#792CA2] via-[#6366F1] via-[#2C5EAD] to-[#792CA2]">
          <img src={photoUrl} className="w-full h-full object-contain" />

          {/* Dark Gradient */}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Top badges */}

          <div className="absolute top-6 right-6">
            <span className="badge badge-primary badge-lg">⚡ 92% Match</span>
          </div>

          {/* Bottom content */}

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-2">
              <h1 className="text-5xl font-bold">
                {firstName} {lastName}
              </h1>

              <BadgeCheck className="text-sky-400" />
            </div>

            <p className="text-xl mt-2 flex items-center gap-2">
              <Building2 size={18} />

              {designation}

              {currentCompany && <>@ {currentCompany}</>}
            </p>

            <div className="flex gap-5 mt-3 text-base opacity-90">
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {location}
              </span>

              <span>
                {gender} • {age} yrs
              </span>

              <span>{totalExperience} Experience</span>
            </div>

            <p className="mt-5 max-w-3xl opacity-90 line-clamp-2">{about}</p>

            {/* Social Links */}

            {/* Skills */}

            <div className="flex flex-wrap gap-2 mt-6">
              {skills.slice(0, 8).map((skill) => (
                <span key={skill} className="badge badge-outline badge-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex justify-center gap-8 p-4">
          <button
            onClick={onIgnore}
            className="btn btn-circle btn-error w-16 h-16 shadow-lg"
          >
            <X size={30} />
          </button>

          <button className="btn btn-circle btn-info w-14 h-14">👀</button>

          <button
            onClick={onLike}
            className="btn btn-circle btn-success w-16 h-16 shadow-lg"
          >
            <Heart fill="white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default UserCard;
