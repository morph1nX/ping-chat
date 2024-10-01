"use client"; // This is a client component
import React, { useState, useEffect } from "react";
import ChatMessage from "../components/chatmessage";
// import "tailwindcss/tailwind.css";
import app from "../utilities/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import io from "socket.io-client";

function ChatRoom() {
  const [messageText, setMessageText] = useState<string>("");

  const [messages, setMessages] = useState<string[]>([]);

  const [socket, setSocket] = useState<any>();

  const auth = getAuth(app);
  const currentUser = auth.currentUser && auth.currentUser.displayName;
  const router = useRouter();

  useEffect(() => {
    const socketIo = io("https://showy-dune-giganotosaurus.glitch.me");

    setSocket(socketIo);
    console.log("set socket");
    // console.log('user', currentUser.displayName)

    socketIo.on("message", (message: string) => {
      console.log("new message: ", message);

      setMessages((messages) => [...messages, message]);
    });

    socketIo.on("user disconnected", () => {
      // signOut(auth).then((user) => console.log('signedout', user )).catch((error) => console.log('errorsignput', error))
      console.log("yep echoed back");
      router.push("/signin");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  function sendMessage() {
    if (socket) {
      socket.emit("message", messageText);

      setMessageText("");

      console.log("sent");
    }
  }

  function handleLogout() {
    signOut(auth)
      .then(() => console.log("signedout"))
      .catch((error) => console.log("errorsignput", error));
    socket.emit("disconnect user");
  }

  return (
    <div className="flex flex-col h-screen">
      <button
        className="p-2 bg-blue-500 text-white rounded-r-md"
        onClick={handleLogout}
      >
        Logout
      </button>

      <ul className="overflow-auto p-2 pb-16">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            date={new Date()}
            user={currentUser}
          />
        ))}
      </ul>

      <div className="fixed bottom-0 left-0 w-full p-2 bg-white">
        <div className="flex items-center border border-gray-300 rounded-md">
          <input
            className="flex-grow p-2 rounded-l-md"
            type="text"
            placeholder="Type a message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
