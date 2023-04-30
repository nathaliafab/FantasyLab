import React, { useState } from "react";
import 'openai';
import './index.css';
import Logo from '../../assets/Logo.png';

function GenerateCharacter() {
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');
  const [hair, setHair] = useState('');
  const [eyes, setEyes] = useState('');
  const [rclass, setClass] = useState('');
  const [age, setAge] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const generatePrompt = () => {
    return `portrait, detailed face, full body, ${race}, ${rclass}, ${gender}, ${hair} hair, realistic detailed ${eyes} eyes, ${age}, detailed face, face, realistic, intricate, detailed, nice colors, hd, 4k, nice background, high fantasy, high quality, epic, vibrant, professional majestic oil painting by fantasy art book illustrators, volumetric lighting, dramatic, fantasy portraits, rpg portraits, character portrait, digital art`;
  }

  const generateImage = async () => {
    if (apiKey === '') {
      alert('Insert you API KEY!')
      return
    }
    setIsLoading(true);

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: generatePrompt(),
      n: 4,
      size: '1024x1024',
    });

    const arr = Object.entries(response.data);
    setImageUrl([arr[1][1][0].url, arr[1][1][1].url, arr[1][1][2].url, arr[1][1][3].url]);

    console.log(arr[1][1]);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="Data">
        <img src={Logo} className="logo" />

        <div>
          <input placeholder="Insert race..." type="text" value={race} onChange={e => setRace(e.target.value)} required />
        </div>

        <div>
          <input placeholder="Insert class..." type="text" value={rclass} onChange={e => setClass(e.target.value)} required />
        </div>

        <div>
          <input placeholder="Insert gender..." type="text" value={gender} onChange={e => setGender(e.target.value)} required />
        </div>

        <div>
          <input placeholder="Insert hair characteristics..." type="text" value={hair} onChange={e => setHair(e.target.value)} required />
        </div>

        <div>
          <input placeholder="Insert eye characteristics..." type="text" value={eyes} onChange={e => setEyes(e.target.value)} required />
        </div>

        <div>
          <input placeholder="Insert age..." type="text" value={age} onChange={e => setAge(e.target.value)} required />
        </div>

        <div>
          <input placeholder="Insert your OpenAI API KEY..." type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} />
        </div>

        <div className="generate">
          <button onClick={generateImage}>Generate character</button>
        </div>

        <div className="image-container">
          {isLoading ? <p className="loading">Loading...</p> :
            imageUrl.map((url, index) => (
              <img src={url} className="generated-img" alt={`generated-img-${index}`} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default GenerateCharacter;
