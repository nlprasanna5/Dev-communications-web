import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  async function getFeed() {
    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(response?.data));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  console.log("feed", feed);

  return (
    feed?.length>0  && (
      <div className="flex justify-center">
        <UserCard user={feed[0] } />
      </div>
    )
  );
}

export default Feed;
