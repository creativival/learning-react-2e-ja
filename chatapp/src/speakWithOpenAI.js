import axios from 'axios';
import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const speakWithOpenAI = async (text) => {
  try {
    // OpenAI APIを使用してテキストから音声を生成
    // const response = await axios.post(
    //   'https://api.openai.com/v1/audio/speech',
    //   {
    //     "model": "tts-1",
    //     "input": text,
    //     "voice": "nova"
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${apiKey}`,
    //     },
    //     responseType: 'arraybuffer',
    //   }
    // );

    // OpenAI APIの設定
    const openai = new OpenAI({ apiKey,
      dangerouslyAllowBrowser: true });
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
    });

    // レスポンスからオーディオデータを取得
    const audioData = await response.arrayBuffer();
    console.log('Audio data:', audioData);

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

export default speakWithOpenAI;