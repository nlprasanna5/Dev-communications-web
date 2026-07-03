
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { ListFilterPlus } from "lucide-react";

// How many "peek" cards to show behind the top card
const STACK_DEPTH = 5;

// Tuning knobs for the fan effect
const STACK_CONFIG = {
  rotate: 8, // degrees of tilt per stack level
  scaleStep: 0.05, // how much smaller each card behind gets
  yOffsetStep: 14, // px each card behind is pushed down
  opacityStep: 0.25, // how much dimmer each card behind gets
  minOpacity: 0.25,
};

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Build the list of "peek" cards behind the current one, deepest first
  // so they stack visually in the right z-order.
  const peekCards = Array.from({ length: STACK_DEPTH })
    .map((_, i) => {
      const depth = STACK_DEPTH - i; // e.g. 3, 2, 1
      const feedIndex = currentIndex + depth;
      return feed[feedIndex]
        ? { user: feed[feedIndex], depth, key: feed[feedIndex]._id }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="relative w-full flex justify-center mt-8">
      {currentIndex >= feed.length ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-7xl mb-4">🎉</div>

          <h2 className="text-3xl font-bold">You're all caught up!</h2>

          <p className="mt-3 text-base-content/70 max-w-md">
            There are no more developers to discover right now. Please check
            back later for new profiles.
          </p>
        </div>
      ) : (
        <>
          {peekCards.map(({ user, depth, key }) => {
            // Alternate left/right tilt based on depth so cards fan out
            // like a real deck: depth 1 -> right, depth 2 -> left, etc.
            const direction = depth % 2 === 0 ? -1 : 1;
            const rotate = direction * STACK_CONFIG.rotate * depth * 0.6;
            const scale = 1 - STACK_CONFIG.scaleStep * depth;
            const translateY = STACK_CONFIG.yOffsetStep * depth;
            const translateX = direction * 6 * depth;
            const opacity = Math.max(
              STACK_CONFIG.minOpacity,
              1 - STACK_CONFIG.opacityStep * depth
            );

            return (
              <div
                key={key}
                className="absolute pointer-events-none transition-all duration-300 ease-out"
                style={{
                  transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex: STACK_DEPTH - depth,
                }}
              >
                <UserCard user={user} preview />
              </div>
            );
          })}

          <div className="relative" style={{ zIndex: STACK_DEPTH + 1 }}>
            <UserCard
              key={feed[currentIndex]._id}
              user={feed[currentIndex]}
              onLike={handleLike}
              onIgnore={handleIgnore}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Feed;
