import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

function Message({ index, text, sender }) {
  return (
    <Box key={index} className={`message ${sender}`}>
      {text}
    </Box>
  );
}

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
      {messages.map(({ text, sender }, index) => (
        Message({ index, text, sender })
      ))}
    </Box>
  );
}