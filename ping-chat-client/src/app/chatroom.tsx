"use client"; // This is a client component
import React, { useState, useEffect } from "react";
import ChatMessage from "./chatmessage";

import io  from "socket.io-client";

function ChatRoom() {
  const [message, setMessage] = useState<string>("");

  const [messages, setMessages] = useState<string[]>([]);

  const [socket, setSocket] = useState<any>()

  

  useEffect(() => {

    if(socket) {
      socket.disconnect();
    }

    const socketIo = io("http://localhost:3001");

    setSocket(socketIo)
    console.log('set socket')

      socketIo.on("message", (message: string) => {
        console.log("new message: ", message);
  
        setMessages((messages) => [...messages, message]);
      });

      return () => {
        socketIo.disconnect()
      }
  }, [])

  function sendMessage() {
    if(socket) {
      socket.emit("message", message);

      setMessage("");
  
      console.log("sent");
    }
    
  }

  return (
    <div className="chat-room">
      <ChatMessage />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>send</button>
    </div>
  );
}

export default ChatRoom;
