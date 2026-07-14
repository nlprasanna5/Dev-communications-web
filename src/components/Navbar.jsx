import {
  ArrowDownWideNarrow,
  MessageCircleMore,
  Users,
  House,
  SquareUserRound,
  ChessQueen 
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    icon: <House />,
    name: "Feed",
    redirect: "/",
  },
  {
    icon: <Users />,
    name: "Connections",
    redirect: "/connections",
  },
  {
    icon: <ArrowDownWideNarrow />,
    name: "Requests",
    redirect: "/requests",
  },
  {
    icon: <MessageCircleMore />,
    name: "Messages",
    redirect: "/chat",
  },
  {
    icon: <SquareUserRound />,
    name: "Profile",
    redirect: "/profile",
  },
  {
    icon: <ChessQueen  />,
    name: "Premium",
    redirect: "/premium",
  },
];

function Navbar() {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  function handleRedirect(path) {
    navigate(path);
  }

  return (
    <nav className="sticky top-0 z-50 bg-base-200 border-b border-base-300">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleRedirect("/")}
        >
          <h1 className="text-primary text-2xl font-bold">{"</>"}</h1>

          <h1 className="text-xl font-bold text-base-content">
            Dev<span className="text-primary">Catchup</span>
          </h1>
        </div>

        {/* Desktop  */}
        <div className="hidden lg:flex items-center gap-2">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleRedirect(item.redirect)}
              className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                location.pathname === item.redirect
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Right Section */}
        {user && (
          <div className="hidden lg:flex items-center gap-4">
            <p className="text-sm">
              Welcome,
              <span className="font-semibold ml-1">{user.firstName}</span>
            </p>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                  <img src={user.photoUrl} alt="profile" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box shadow-lg w-56 mt-3 p-2"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>

                <li>
                  <a>Settings</a>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-ghost btn-circle lg:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-base-300 bg-base-100 shadow-lg">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  handleRedirect(item.redirect);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                  location.pathname === item.redirect
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}

            {user && (
              <>
                <div className="divider my-2"></div>

                <div className="flex items-center gap-3 px-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.photoUrl} alt="profile" />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold">{user.firstName}</p>

                    <p className="text-sm text-base-content/70">Welcome back</p>
                  </div>
                </div>

                <button
                  className="btn btn-ghost justify-start"
                  onClick={() => {
                    handleRedirect("/profile");
                    setMobileMenuOpen(false);
                  }}
                >
                  Profile
                </button>

                <button className="btn btn-ghost justify-start">
                  Settings
                </button>

                <button
                  className="btn btn-error btn-outline mt-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
