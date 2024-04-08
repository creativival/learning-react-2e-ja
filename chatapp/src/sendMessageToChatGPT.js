import React from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const speakWithOpenAI = async (text, apiKey) => {
  try {
    // OpenAI APIを使用してテキストから音声を生成
    const response = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      {
        "model": "tts-1",
        "input": text,
        "voice": "nova"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        responseType: 'arraybuffer',
      }
    );

    // レスポンスからオーディオデータを取得
    const audioData = response.data;

    // Audioオブジェクトを作成
    const audio = new Audio();

    // オーディオデータをBlobに変換してソースに設定
    const audioBlob = new Blob([audioData], {type: 'audio/mpeg'});
    const audioUrl = URL.createObjectURL(audioBlob);
    audio.src = audioUrl;

    // 音声再生
    await audio.play();

    // 再生が終わるまで待機
    await new Promise((resolve) => {
      audio.onended = resolve;
    });

    console.log('TTS playback completed.');
  } catch (error) {
    console.error('Error:', error);
    console.error("Sorry, I couldn't generate the TTS output.");
  }
};

const sendMessageToChatGPT = async (messages, setMessages, SYSTEM_CONTENT, text) => {
  try {
    const messageData = [
      {role: 'system', content: SYSTEM_CONTENT}
    ];

    messages.forEach((message) => {
      messageData.push({role: message.sender, content: message.text});
    });

    messageData.push({role: 'user', content: text});

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
      {text: assistantMessage, sender: 'assistant'},
    ]);

    await speakWithOpenAI(assistantMessage, apiKey)
  } catch (error) {
    console.error('Error:', error);
  }
};

export default sendMessageToChatGPT;