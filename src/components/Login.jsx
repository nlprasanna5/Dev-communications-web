import { useState } from "react";
import loginImage from "../assets/login_image.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import LoginLeftSide from "./LoginLeftSide";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true },
      );

      console.log("result", result);
      dispatch(addUser(result?.data));
      navigate("/");
    } catch (err) {
      console.log("login", err);

      setError(err?.response?.data?.message || "Something went wrong");
      console.error("hello", err?.response);
    }
  };

  return (
    <main data-theme="mytheme" className="min-h-screen bg-base-100 p-6   flex">
      {/* Left Section */}
      <LoginLeftSide/>

      {/* Right Section */}
      <section className="flex  bg-base-200 rounded-[10px] p-4 py-8 flex-1 border border-base-300 ">
        <article className="w-full flex flex-col gap-10">
          {/* Login Header */}
          <header className="text-center flex flex-col justify-center">
            <h2 className="text-[36px]">Welcome Back 👋</h2>
            <p className="text-[#A9A9A9] text-xl tracking-widest">
              Login to your account
            </p>
          </header>

          {/* Login Form */}
          <form className="px-18  w-full flex flex-col gap-4 ">
            {/* Form Fields */}
            <section className="w-full  flex flex-col gap-6">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-lg">Email Id</legend>

                <label className="input validator w-full   h-[52px]  ">
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
                    className=""
                  />
                </label>

                <p className="validator-hint hidden">
                  Enter valid email address
                </p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Password</legend>

                <label className="input validator w-full h-[52px] ">
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
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                    </g>
                  </svg>

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-base-content/60 hover:text-base-content"
                  >
                    {showPassword ? (
                      // Eye Off Icon
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
                          d="M3 3l18 18M10.58 10.58A3 3 0 0013.42 13.42M9.88 5.09A9.77 9.77 0 0112 4.5c5.25 0 9.27 4.11 10 7.5a11.83 11.83 0 01-4.23 5.94M6.23 6.23A11.79 11.79 0 002 12c.73 3.39 4.75 7.5 10 7.5a9.76 9.76 0 004.12-.91"
                        />
                      </svg>
                    ) : (
                      // Eye Icon
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

                <p className="validator-hint hidden">
                  Must be more than 8 characters, including:
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                  <br />
                  At least one uppercase letter
                </p>
              </fieldset>
            </section>

            {/* Remember & Forgot Password */}
            <nav className="flex justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="text-secondary text-sm font-medium cursor-pointer underline-offset-2 hover:underline transition"
              >
                Forgot password?
              </button>
            </nav>
            <p className="text-red-500">{error}</p>
            {/* Submit Button */}
            <button
              className="btn btn-primary h-[52px] mt-[20px]"
              onClick={onSubmitLogin}
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <footer className="text-center">
            <p>
              Don't have an account?{" "}
              <span className="text-secondary underline cursor-pointer"
              onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}

export default Login;
