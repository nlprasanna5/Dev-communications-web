import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

// How many "peek" cards to show behind the top card (desktop default)
const STACK_DEPTH = 5;

// Tuning knobs for the fan effect, per breakpoint.
// mobile: < 640px, tablet: 640px - 1023px, desktop: >= 1024px
const STACK_CONFIG_BY_BREAKPOINT = {
  mobile: {
    rotate: 4,
    scaleStep: 0.04,
    yOffsetStep: 8,
    xOffsetStep: 3,
    opacityStep: 0.25,
    minOpacity: 0.25,
  },
  tablet: {
    rotate: 6,
    scaleStep: 0.045,
    yOffsetStep: 11,
    xOffsetStep: 5,
    opacityStep: 0.25,
    minOpacity: 0.25,
  },
  desktop: {
    rotate: 8,
    scaleStep: 0.05,
    yOffsetStep: 14,
    xOffsetStep: 6,
    opacityStep: 0.25,
    minOpacity: 0.25,
  },
};

function getBreakpoint(width) {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

// Tracks viewport width and returns the current breakpoint key.
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() =>
    typeof window !== "undefined"
      ? getBreakpoint(window.innerWidth)
      : "desktop",
  );

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const breakpoint = useBreakpoint();
  const stackConfig = STACK_CONFIG_BY_BREAKPOINT[breakpoint];

  // Show fewer peek cards on smaller screens to avoid overflow/clutter
  const stackDepth =
    breakpoint === "mobile" ? 5 : breakpoint === "tablet" ? 3 : STACK_DEPTH;

  async function handleSendRequest(status, userId) {
    try {
      const result = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(result);

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  }

  function handleIgnore(status, userId) {
    handleSendRequest(status, userId);
    // setCurrentIndex((prev) => prev + 1);
  }

  function handleLike(status, userId) {
    console.log("status", status, "userId", userId);

    handleSendRequest(status, userId);
    // setCurrentIndex((prev) => prev + 1);
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
  const peekCards = Array.from({ length: stackDepth })
    .map((_, i) => {
      const depth = stackDepth - i; // e.g. 3, 2, 1
      const feedIndex = depth;
      return feed[feedIndex]
        ? { user: feed[feedIndex], depth, key: feed[feedIndex]._id }
        : null;
    })
    .filter(Boolean);

  return (
    <div className="relative w-full flex justify-center px-4 mt-4 sm:mt-6 lg:mt-8">
      {feed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 text-center px-4">
          <div className="text-5xl sm:text-6xl lg:text-7xl mb-4">🎉</div>

          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold">
            You're all caught up!
          </h2>

          <p className="mt-3 text-sm sm:text-base text-base-content/70 max-w-md">
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
            const rotate = direction * stackConfig.rotate * depth * 0.6;
            const scale = 1 - stackConfig.scaleStep * depth;
            const translateY = stackConfig.yOffsetStep * depth;
            const translateX = direction * stackConfig.xOffsetStep * depth;
            const opacity = Math.max(
              stackConfig.minOpacity,
              1 - stackConfig.opacityStep * depth,
            );

            return (
              <div
                key={key}
                className="absolute pointer-events-none transition-all duration-300 ease-out w-full max-w-[92vw] sm:max-w-[420px] lg:max-w-[450px]"
                style={{
                  transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  zIndex: stackDepth - depth,
                }}
              >
                <UserCard user={user} preview />
              </div>
            );
          })}

          <div
            className="relative w-full max-w-[92vw] sm:max-w-[420px] lg:max-w-[450px]"
            style={{ zIndex: stackDepth + 1 }}
          >
            <UserCard
              key={feed[0]._id}
              user={feed[0]}
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
