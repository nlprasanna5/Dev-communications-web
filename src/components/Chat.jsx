import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formatTime } from "../utils/helperFunctions";

function Chat() {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const [error, setError] = useState("");
  const [isTargetOnline, setIsTargetOnline] = useState(false);
  const [targetUser, setTargetUser] = useState({});
  const messagesEndRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const chatContainerRef = useRef(null);

  const fetchChatMessages = async (pageNumber = 1) => {
    try {
      setLoadingMessages(true);
      const chat = await axios.get(
        `${BASE_URL}/chat/${targetUserId}?page=${pageNumber}&limit=7`,
        {
          withCredentials: true,
        },
      );

      // console.log(chat?.data?.messages);

      const chatMessages = chat?.data?.messages?.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
          createdAt: msg.createdAt,
          seen: msg.seen,
        };
      });

      if (pageNumber === 1) {
        setMessages(chatMessages);
      } else {
        // prepend older messages
        setMessages((prev) => [...chatMessages, ...prev]);
      }
      // setMessages(chatMessages);
      setTargetUser(chat?.data?.targetUser);
      setHasMore(chat.data?.pagination.hasMore);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchChatMessages(1);
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.on("connect_error", (err) => {
      console.log(err.message);
      setError(err.message);
    });

    socketRef.current.on("messageError", ({ message }) => {
      console.log("socket-error", message);

      setError(message);
    });

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on(
      "messageReceived",
      ({ firstName, lastName, text, timestamp }) => {
        setMessages((prev) => [
          ...prev,
          { firstName, text, lastName, createdAt: timestamp },
        ]);

        // If I'm viewing this chat, tell the server I've seen it
        socketRef.current.emit("messagesSeen", {
          userId,
          targetUserId,
        });
      },
    );

    socketRef.current.on("messagesSeen", () => {
      setMessages((prev) =>
        prev.map((message) => ({
          ...message,
          seen: true,
        })),
      );
    });

    socketRef.current.on(
      "userStatusChanged",
      ({ userId: changedUserId, isOnline }) => {
        if (changedUserId === targetUserId) {
          setIsTargetOnline(isOnline);
        }
      },
    );

    socketRef.current.emit("messagesSeen", {
      userId,
      targetUserId,
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const loadMoreMessages = async () => {
    if (loadingMessages || !hasMore) return;

    const container = chatContainerRef.current;

    // Store current scroll height before loading older messages
    const previousHeight = container.scrollHeight;

    const nextPage = page + 1;

    await fetchChatMessages(nextPage);

    setPage(nextPage);

    // Restore scroll position after new messages are prepended
    requestAnimationFrame(() => {
      const newHeight = container.scrollHeight;
      container.scrollTop = newHeight - previousHeight;
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = chatContainerRef.current;

    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop <= 50 && hasMore && !loadingMessages) {
        loadMoreMessages();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingMessages]);

  function sendMessage() {
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  }

  return (
    <div className="h-dvh bg-base-200 overflow-hidden flex justify-center items-center p-0 sm:p-4">
      <div className="w-full max-w-4xl h-dvh sm:h-[80vh] bg-base-100 sm:rounded-3xl shadow-2xl border border-base-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-base-300 bg-base-100 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <img
                src={targetUser?.photoUrl}
                alt="profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />

              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100 ${
                  isTargetOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>

            <div>
              <h2 className="font-bold text-base sm:text-lg">
                {targetUser?.firstName} {targetUser?.lastName}
              </h2>

              <p
                className={`text-xs sm:text-sm ${
                  isTargetOnline ? "text-green-500" : "text-base-content/50"
                }`}
              >
                {isTargetOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 bg-base-200"
        >
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isMe =
                message.firstName === user?.firstName &&
                message.lastName === user?.lastName;

              return (
                <div
                  key={index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-md ${
                      isMe
                        ? "bg-secondary text-secondary-content rounded-br-md"
                        : "bg-base-100 border border-base-300 rounded-bl-md"
                    }`}
                  >
                    {!isMe && (
                      <p className="text-xs font-semibold mb-1 text-primary">
                        {message.firstName} {message.lastName}
                      </p>
                    )}

                    <p className="break-words text-sm sm:text-base">
                      {message.text}
                    </p>

                    <div
                      className={`text-[10px] sm:text-[11px] mt-2 ${
                        isMe
                          ? "text-right text-secondary-content/70"
                          : "text-right text-base-content/50"
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="px-3 sm:px-4 pb-2">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-base-300 bg-base-100 p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1 rounded-full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newMessage.trim()) {
                  sendMessage();
                }
              }}
            />

            <button
              className="btn btn-secondary rounded-full px-5 sm:px-8"
              disabled={!newMessage.trim()}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
