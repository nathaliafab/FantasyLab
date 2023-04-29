import { useState, useEffect } from 'react';
import 'openai';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const generateImage = async () => {
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt: 'A cute baby sea otter',
        n: 2,
        size: '1024x1024',
      });

      const arr = Object.entries(response.data);
      setImageUrl(arr[1][1][0].url);
    };

    generateImage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageUrl} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
