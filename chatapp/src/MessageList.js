import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      console.log("scrolling to bottom");
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box className="message-list" ref={messageListRef}>
      {messages.map((message, index) => (
        <Box key={index} className={`message ${message.sender}`}>
          {message.text}
        </Box>
      ))}
    </Box>
  );
}