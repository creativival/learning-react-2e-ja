import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";

export default function InputField({ onSend }) {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    if (text.trim() !== '') {
      onSend(text);
      setText('');
    }
  };

  return (
    <Box className="input-container">
      <TextField
        className="input-field"
        placeholder="メッセージを入力..."
        value={text}
        onChange={handleChange}
        // onKeyPress={handleKeyPress}
      />
      <Button
        className="send-button"
        variant="contained"
        onClick={handleSendClick}
      >
        送信
      </Button>
    </Box>
  );
}