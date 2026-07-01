import {
  MapPin,
  BriefcaseBusiness,
  UserRound,
  MailCheck,
  CodeXml,
  Presentation,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

const links = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/your-profile",
  },
  {
    name: "GitHub",
    url: "https://github.com/your-profile",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/your-profile",
  },
];

const skills = [
  { name: "JavaScript", level: "Expert" },
  { name: "React", level: "Expert" },
  { name: "Node.js", level: "Intermediate" },
  { name: "CSS", level: "Expert" },
  { name: "HTML", level: "Expert" },
];

const experience = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Tech Company",
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Web Agency",
  },
  {
    id: 3,
    role: "Intern",
    company: "Startup",
  },
];

const projects = [
  {
    id: 1,
    title: "Project One",
    description:
      "Description for project one.Description for project one.Description for project one",
    techStack: ["React", "Node.js"],
  },
  {
    id: 2,
    title: "Project Two",
    description: "Description for project two.",
    techStack: ["Vue.js", "Firebase"],
  },
  {
    id: 3,
    title: "Project Three",
    description: "Description for project three.",
    techStack: ["Angular", "Express"],
  },
];

const profileStrength = [
  {
    title: "Projects",
    value: 70,
    icon: <CircleCheckBig className="text-success" size={16} />,
  },
  {
    title: "Skills",
    value: 80,
    icon: <CircleCheckBig className="text-success" size={16} />,
  },
  {
    title: "Experience",
    value: 60,
    icon: <CircleX className="text-error" size={16} />,
  },
];

const connections = [
  {
    id: 1,
    name: "John Doe",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/100?img=1",
    status: "Online",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "Backend Engineer",
    image: "https://i.pravatar.cc/100?img=5",
    status: "Offline",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/100?img=8",
    status: "Online",
  },
];

function ProfileView() {
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99aE0doW8ZJu-iNF8l_eFhn2vaGFhpWkww6O1kkqvSg&s=10"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </figure>

            <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-primary-content">
                  Name
                </h2>

                <p className="text-secondary-content">Designation</p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                <p className="text-primary-content flex items-center gap-1">
                  <MapPin size={16} />
                  Location
                </p>

                <p className="text-primary-content flex items-center gap-1">
                  <BriefcaseBusiness size={16} />
                  Experience
                </p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {links?.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="border border-base-300 rounded-md px-3 py-2 text-xs text-secondary-content hover:bg-base-100/10 transition"
                  >
                    {link.url}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="self-center lg:self-start">
            <button className="btn btn-primary w-full sm:w-auto">
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

              <p className="text-base-content leading-7">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="border border-base-300 rounded-md px-3 py-2 text-sm">
                  <MailCheck size={16} className="inline-block mr-2" />
                  lakshmi@gmail.com
                </div>

                <div className="border border-base-300 rounded-md px-3 py-2 text-sm">
                  <MapPin size={16} className="inline-block mr-2" />
                  Location
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
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="px-3 py-1 rounded-full border border-base-300 text-sm"
                  >
                    {skill.name}
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
                {experience.map((exp) => (
                  <li key={exp.id} className="step step-primary text-left">
                    <div>
                      <p className="font-semibold">{exp.role}</p>

                      <p className="text-sm opacity-70">{exp.company}</p>
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
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="bg-base-200 rounded-lg p-4 flex flex-col gap-3"
                >
                  <h4 className="font-semibold text-primary text-lg">
                    {project.title}
                  </h4>

                  <p className="text-sm text-base-content leading-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded border border-base-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
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
              style={{ "--value": 70 }}
              aria-valuenow={70}
              role="progressbar"
            >
              70%
            </div>

            <div className="w-full sm:flex-1">
              <progress
                className="progress progress-success w-full"
                value="70"
                max="100"
              ></progress>

              <p className="mt-2 text-center sm:text-left text-sm font-medium text-success">
                Excellent
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {profileStrength?.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-lg border border-base-300 p-3"
              >
                <div className="text-primary">{item.icon}</div>

                <span className="text-sm md:text-base">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connections */}
        <div className="bg-base-100 border border-base-300 rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold text-base-content mb-5">
            Connections
          </h2>

          <div className="flex flex-col gap-4">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg bg-base-200 p-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={connection.image}
                    alt={connection.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-medium truncate">{connection.name}</p>

                    <p className="text-sm text-base-content/70 truncate">
                      {connection.role}
                    </p>
                  </div>
                </div>

                <div
                  className={`badge self-start sm:self-center ${
                    connection.status === "Online"
                      ? "badge-success"
                      : "badge-neutral"
                  }`}
                >
                  {connection.status}
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-outline btn-primary w-full mt-6">
            View All Connections
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProfileView;
