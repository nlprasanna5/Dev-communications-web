import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function Chat() {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);

  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   const socket = createSocketConnection();

  //   // As soons as th epage loaded, the socket connection is made and jointchat event is emitted
  //   socket.emit("joinChat", {
  //     firstName: user?.firstName,
  //     userId,
  //     targetUserId,
  //   });

  //   socket.on("messageReceived",({firstName,text}) => {
  //       console.log(firstName+" : "+text);
  //       setMessages((messages) => [...messages,{firstName,text}])

  //   })

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [userId, targetUserId]);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      console.log(chat?.data?.messages);

      const chatMessages = chat?.data?.messages?.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ firstName,lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, text,lastName }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  // function sendMessage() {
  //    const socket = createSocketConnection();
  //   socket.emit("sendMessage", {
  //     firstName: user?.firstName,
  //     userId,
  //     targetUserId,
  //     text: newMessage,
  //   });
  //   setNewMessage("")
  // }

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
    <div className="flex justify-center items-center py-8 bg-base-200 min-h-screen">
      <div className="w-full max-w-3xl h-[80vh] bg-base-100 rounded-2xl shadow-2xl border border-base-300 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-base-300 bg-base-100">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="https://i.pravatar.cc/150?img=3" alt="profile" />
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg">Developer Chat</h2>
            <p className="text-sm text-success">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-base-200 px-6 py-5 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${user?.firstName === message?.firstName ? "chat-end" : "chat-start"}`}
              // className={`chat ${
              //   message.sender === "sender" ? "chat-end" : "chat-start"
              // }`}
            >
              {message.sender === "receiver" && (
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={message.avatar} alt="User Avatar" />
                  </div>
                </div>
              )}

              <div
                className={`chat-bubble ${
                  message.sender === "sender"
                    ? "chat-bubble-secondary"
                    : "bg-base-300 text-base-content"
                }`}
              >
                {message.text}
              </div>

              <div className="chat-footer text-xs opacity-60 mt-1">
                {message.time}
              </div>
              <div className="chat-footer text-xs opacity-60 mt-1 font-medium">
                {message.firstName} {message.lastName}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-base-300 bg-base-100 p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered flex-1"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button className="btn btn-secondary px-8" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
