import React from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const sendMessageToChatGPT = async (messages, setMessages, SYSTEM_CONTENT, text) => {
  try {
    const messageData = [
      { role: 'system', content: SYSTEM_CONTENT }
    ];

    messages.forEach((message) => {
      messageData.push({ role: message.sender, content: message.text });
    });

    messageData.push({ role: 'user', content: text });

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messageData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const assistantMessage = response.data.choices[0].message.content;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: assistantMessage, sender: 'assistant' },
    ]);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default sendMessageToChatGPT;