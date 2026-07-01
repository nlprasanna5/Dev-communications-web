import {
  ArrowDownWideNarrow,
  MessageCircleMore,
  Users,
  House,
  SquareUserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

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
    redirect: "/messages",
  },
  {
    icon: <SquareUserRound />,
    name: "Profile",
    redirect: "/profile",
  },
];

function Navbar() {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
    <nav
      className={` flex items-center  justify-between bg-base-200 border border-base-300 rounded-bl-lg rounded-br-lg `}
    >
      {/* logo section */}
      <section className="flex gap-2 px-4 ">
        <h1 className="text-primary text-[20px]">{"</>"}</h1>

        <h1 className="text-base-content text-[20px]">
          Dev<span className="text-primary">Catchup</span>
        </h1>
      </section>

      {/* middle nav links section */}

      <section className="flex gap-10 h-full">
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleRedirect(item.redirect)}
            className={`relative flex items-center gap-2 px-4 py-3 transition-colors duration-200 ${
              location.pathname === item.redirect
                ? "text-secondary"
                : "text-base-content hover:text-primary"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>

            {/* Underline */}
            <p
              className={`absolute -bottom-[2px] left-0 h-[3px] w-full rounded-full transition-all duration-300 ${
                location.pathname === item.redirect
                  ? "bg-secondary opacity-100"
                  : "bg-transparent opacity-0"
              }`}
            />
          </button>
        ))}
      </section>

      {/* right section profile pic logout */}

      {user && (
        <section className="flex gap-2 items-center ">
          <p>Welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </section>
      )}
    </nav>
  );
}

export default Navbar;
