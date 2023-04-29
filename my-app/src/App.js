import { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const generateImage = async () => {
      const configuration = new Configuration({
        apiKey: "",
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt: 'A cute baby sea otter',
        n: 2,
        size: '1024x1024',
      });
      setImageUrl(response.data[0].url);
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
