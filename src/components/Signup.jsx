import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import LoginLeftSide from "./LoginLeftSide";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onCreateAccount = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("password and confirm password should be same");
    }

    try {
      const result = await axios.post(
        `${BASE_URL}/signup`,
        {
          emailId: emailId,
          password: password,
          confirmPassword: confirmPassword,
          firstName: firstname,
          lastName: lastname,
        },
        { withCredentials: true },
      );

      console.log("result", result);
      dispatch(addUser(result?.data?.data));

      navigate("/profile");
    } catch (err) {
      console.log("login", err);

      setError(err?.response?.data?.message || "Something went wrong");
      console.error("hello", err?.response);
    }
  };

  return (
    <main
      data-theme="mytheme"
      className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-6 flex items-center justify-center lg:justify-start gap-6"
    >
      {/* Left Section - Desktop Only */}
      <div className="hidden lg:flex flex-1">
        <LoginLeftSide />
      </div>

      {/* Right Section */}
      <section className="w-full lg:flex-1 max-w-xl lg:max-w-none bg-base-200 rounded-xl border border-base-300 p-5 sm:p-8 lg:p-8 mx-auto">
        <article className="w-full flex flex-col gap-8">
          {/* Header */}
          <header className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Create Account</h2>

            <p className="text-base sm:text-lg text-base-content/60 mt-2">
              Join DevCatchup today!
            </p>
          </header>

          {/* Form */}
          <form className="w-full flex flex-col gap-5 px-0 sm:px-6 lg:px-12">
            <section className="flex flex-col gap-4">
              {/* First Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">First Name</legend>

                <input
                  type="text"
                  className="input w-full h-12"
                  placeholder="Enter first name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </fieldset>

              {/* Last Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Last Name</legend>

                <input
                  type="text"
                  className="input w-full h-12"
                  placeholder="Enter last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </fieldset>

              {/* Email */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Email</legend>

                <label className="input validator w-full h-12">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </g>
                  </svg>

                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="mail@site.com"
                    required
                  />
                </label>
              </fieldset>

              {/* Password */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Password</legend>

                <label className="input validator w-full h-12">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 002 18.828V21a1 1 0 001 1h3a1 1 0 001-1v-1a1 1 0 011-1h1a1 1 0 001-1v-1a1 1 0 011-1h.172a2 2 0 001.414-.586l.814-.814a6.5 6.5 0 10-4-4z" />
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                    </g>
                  </svg>

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </label>
              </fieldset>

              {/* Confirm Password */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">
                  Confirm Password
                </legend>

                <label className="input validator w-full h-12">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 002 18.828V21a1 1 0 001 1h3a1 1 0 001-1v-1a1 1 0 011-1h1a1 1 0 001-1v-1a1 1 0 011-1h.172a2 2 0 001.414-.586l.814-.814a6.5 6.5 0 10-4-4z" />
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                    </g>
                  </svg>

                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </label>
              </fieldset>
            </section>

            

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              className="btn btn-primary h-12 sm:h-14 mt-2"
              onClick={onCreateAccount}
            >
              Create Account
            </button>
          </form>

          <footer className="text-center">
            <p>
              Already have an account?{" "}
              <span
                className="text-secondary underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}

export default Signup;
