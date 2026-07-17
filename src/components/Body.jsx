import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "../utils/userSlice";
import { createSocketConnection } from "../utils/socket";
import { setOnlineUsers, updateUserStatus } from "../utils/onlineUserSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
 
     fetchUser();
  }, []);

  // Connect socket once user is available

  useEffect(() => {
    if (!userData?._id) return;

    const socket = createSocketConnection();

    socket.on("connect", () => {
      console.log("Socket Connected");
    });

    socket.on("onlineUsers", (users) => {
      console.log("Online Users:", users);
      dispatch(setOnlineUsers(users));
    });

    socket.on("userStatusChanged", ({ userId, isOnline }) => {
      console.log(userId, isOnline);
      dispatch(updateUserStatus({ userId: userId, isOnline: isOnline }));
    });

    return () => {
      socket.off("onlineUsers");

      socket.off("userStatusChanged");
    };
  }, [userData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Body;
