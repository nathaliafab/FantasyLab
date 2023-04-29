import { useState, useEffect } from 'react';
import 'openai';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const generateImage = async () => {
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt: 'A cute baby sea otter',
        n: 2,
        size: '1024x1024',
      });
      setImageUrl(Object.values(Object.values(response.data).flat()[1])[0]);
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
