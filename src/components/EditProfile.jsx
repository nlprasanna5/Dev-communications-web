import { useState } from "react";
import { ArrowLeft, Camera, User, BriefcaseBusiness, X } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [techStackInputs, setTechStackInputs] = useState({});
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    designation: user?.designation || "",
    currentCompany: user?.currentCompany || "",
    location: user?.location || "",
    email: user?.email || "",
    age: user?.age || "",
    gender: user?.gender || "",
    about: user?.about || "",
    photoUrl: user?.photoUrl || "",

    github: user?.github || "",
    linkedin: user?.linkedin || "",
    portfolio: user?.portfolio || "",

    skills: user?.skills || [],
    experience: user?.experience || [],
    projects: user?.projects || [],
    totalExperience: user?.totalExperience || "",
    socialLinks: {
      github: user?.socialLinks?.github,
      linkedin: user?.socialLinks?.linkedin,
      portfolio: user?.socialLinks?.portfolio,
    },
  });

  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.socialLinks) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const saveProfile = async () => {
    setError("");
    console.log("project", formData?.projects);
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          photoUrl: formData.photoUrl,
          age: formData.age,
          gender: formData.gender,
          about: formData.about,
          skills: formData.skills,
          designation: formData.designation,
          location: formData.location,
          experience: formData.experience,
          currentCompany: formData.currentCompany,
          totalExperience: formData.totalExperience,
          socialLinks: {
            github: formData.socialLinks.github,
            linkedin: formData.socialLinks.linkedin,
            portfolio: formData.socialLinks.portfolio,
          },
          projects: formData.projects,
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

  function handleOnKeyDown(e, projectIndex) {
    if (e.key !== "Enter" && e.key !== ",") return;

    e.preventDefault();

    const value = techStackInputs[projectIndex]?.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, index) => {
        if (index !== projectIndex) return project;

        const technologies = project.technologies || [];

        // Prevent duplicates
        if (technologies.includes(value)) {
          return project;
        }

        return {
          ...project,
          technologies: [...technologies, value],
        };
      }),
    }));

    // Clear input
    setTechStackInputs((prev) => ({
      ...prev,
      [projectIndex]: "",
    }));
  }

  function handleRemoveTechnology(projectIndex, techIndex) {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project, index) =>
        index === projectIndex
          ? {
              ...project,
              technologies: project.technologies.filter(
                (_, i) => i !== techIndex,
              ),
            }
          : project,
      ),
    }));
  }

  return (
    <main className="min-h-screen bg-base-200 px-4">
      <div className="max-w-7xl mx-auto py-2 ">
        {/* Header */}

        {showToast && (
          <div className="toast toast-top toast-end z-50">
            <div className="alert alert-success">
              <span>Profile updated successfully!</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-4 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary btn-outline "
          >
            {" "}
            <ArrowLeft /> Back
          </button>
          <h1 className="text-lg font-bold">Edit Profile</h1>
        </div>

        {/* Main Card */}

        <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
          {/* Profile Photo */}

          <div className="border-b border-base-300 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={formData.photoUrl || "https://placehold.co/200x200"}
                  className="w-36 h-36 rounded-full object-cover border-4 border-primary"
                  alt="Profile"
                />

                <button className="btn btn-primary btn-circle absolute bottom-1 right-1">
                  <Camera size={18} />
                </button>
              </div>

              <div className="flex-1 w-full">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Profile Image URL</span>
                  </div>

                  <input
                    type="text"
                    className="input input-bordered w-full"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Basic Information */}

          <div className="p-8">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <User className="text-primary" size={20} />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Designation</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Company</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Total Experience</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="totalExperience"
                  value={formData.totalExperience}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Location</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>

                <select
                  className="select select-bordered"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
            </div>
          </div>

          {/* About */}

          <div className="border-t border-base-300 p-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BriefcaseBusiness className="text-primary" size={20} />
              About
            </h2>

            <textarea
              className="textarea textarea-bordered w-full h-40"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell people something about yourself..."
            />
          </div>

          {/* Social Links */}

          <div className="border-t border-base-300 p-6">
            <h2 className="text-xl font-semibold mb-2">Social Links</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Github</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LinkedIn</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Portfolio</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  name="portfolio"
                  value={formData.socialLinks.portfolio}
                  onChange={handleChange}
                />
              </fieldset>
            </div>
          </div>
        </div>

        {/* Skills */}

        <div className="bg-base-100 mt-4 border border-base-300 rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Skills</h2>

            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  skills: [...prev.skills, ""],
                }))
              }
            >
              + Add Skill
            </button>
          </div>

          <div className="space-y-3">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-3">
                <input
                  className="input input-bordered flex-1"
                  value={skill}
                  onChange={(e) => {
                    const updated = [...formData.skills];
                    updated[index] = e.target.value;

                    setFormData((prev) => ({
                      ...prev,
                      skills: updated,
                    }));
                  }}
                />

                <button
                  className="btn btn-error btn-outline"
                  onClick={() => {
                    const updated = formData.skills.filter(
                      (_, i) => i !== index,
                    );

                    setFormData((prev) => ({
                      ...prev,
                      skills: updated,
                    }));
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}

        <div className="bg-base-100 mt-4 border border-base-300 rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Experience</h2>

            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  experience: [
                    ...prev.experience,
                    {
                      role: "",
                      company: "",
                      duration: "",
                    },
                  ],
                }))
              }
            >
              + Add Experience
            </button>
          </div>

          <div className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div
                key={index}
                className="border border-base-300 rounded-xl p-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="input input-bordered"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((exp, i) =>
                          i === index ? { ...exp, role: e.target.value } : exp,
                        ),
                      }));
                    }}
                  />

                  <input
                    className="input input-bordered"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((exp, i) =>
                          i === index
                            ? { ...exp, company: e.target.value }
                            : exp,
                        ),
                      }));
                    }}
                  />
                  <input
                    className="input input-bordered"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        experience: prev.experience.map((exp, i) =>
                          i === index
                            ? { ...exp, duration: e.target.value }
                            : exp,
                        ),
                      }));
                    }}
                  />
                </div>

                <button
                  className="btn btn-error btn-outline btn-sm mt-4"
                  onClick={() => {
                    const updated = formData.experience.filter(
                      (_, i) => i !== index,
                    );

                    setFormData((prev) => ({
                      ...prev,
                      experience: updated,
                    }));
                  }}
                >
                  Remove Experience
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}

        <div className="bg-base-100 mt-4 border border-base-300 rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Projects</h2>

            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  projects: [
                    ...prev.projects,
                    {
                      title: "",
                      description: "",
                      technologies: [],
                      link: "",
                    },
                  ],
                }))
              }
            >
              + Add Project
            </button>
          </div>

          <div className="space-y-6">
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="border border-base-300 rounded-xl p-5"
              >
                <div className="space-y-4">
                  <input
                    className="input input-bordered w-full"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        projects: prev.projects.map((project, i) =>
                          i === index
                            ? { ...project, title: e.target.value }
                            : project,
                        ),
                      }));
                    }}
                  />

                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        projects: prev.projects.map((project, i) =>
                          i === index
                            ? { ...project, description: e.target.value }
                            : project,
                        ),
                      }));
                    }}
                  />

                  <input
                    className="input input-bordered w-full"
                    placeholder="Project Link"
                    value={project.link}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        projects: prev.projects.map((project, i) =>
                          i === index
                            ? { ...project, link: e.target.value }
                            : project,
                        ),
                      }));
                    }}
                  />

                  <div className="space-y-3">
                    <input
                      className="input input-bordered w-full"
                      placeholder="Press Enter to add technologies"
                      value={techStackInputs[index] || ""}
                      onChange={(e) =>
                        setTechStackInputs((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                    />

                    {/* Technology Chips */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech, techIndex) => (
                        <div
                          key={tech}
                          className="badge badge-primary gap-2 px-3 py-4"
                        >
                          <span>{tech}</span>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveTechnology(index, techIndex)
                            }
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn btn-error btn-outline btn-sm"
                    onClick={() => {
                      const updated = formData.projects.filter(
                        (_, i) => i !== index,
                      );

                      setFormData((prev) => ({
                        ...prev,
                        projects: updated,
                      }));
                    }}
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}

        <div className="border-t border-base-300 p-8 flex flex-col sm:flex-row justify-end gap-4">
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            Cancel
          </button>

          <button className="btn btn-primary" onClick={saveProfile}>
            Save Changes
          </button>
        </div>

        {error && (
          <div className="px-8 pb-8">
            <div className="alert alert-error">{error}</div>
          </div>
        )}
      </div>
    </main>
  );
}

export default EditProfile;
