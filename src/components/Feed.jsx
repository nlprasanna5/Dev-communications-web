import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { ListFilterPlus } from "lucide-react";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUser = feed[currentIndex];

  function handleIgnore() {
    // Call your API here

    setCurrentIndex((prev) => prev + 1);
  }

  function handleLike() {
    // Call your API here

    setCurrentIndex((prev) => prev + 1);
  }

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
    <main className="flex  flex-col justify-center p-8 max-w-7xl mx-auto">
      <section className="flex justify-between">
        <p className=" font-bold">Discover Amazing Developers</p>
        <p className="flex gap-2 text-center font-bold">
          <ListFilterPlus /> <span>Filters</span>
        </p>
      </section>
      <div className="relative w-full flex justify-center">
        {feed[currentIndex + 2] && (
          <div className={`absolute scale-90 translate-y-10 opacity-30 pointer-events-none`}>
            <UserCard user={feed[currentIndex + 2]} preview />
          </div>
        )}

        {feed[currentIndex + 1] && (
          <div className={`absolute scale-95 translate-y-5 opacity-60 pointer-events-none`}>
            <UserCard user={feed[currentIndex + 1]} preview />
          </div>
        )}

        <UserCard user={feed[currentIndex]} />
      </div>
    </main>
  );
}

export default Feed;
