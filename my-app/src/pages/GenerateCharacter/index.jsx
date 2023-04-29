import React, { useState } from "react";
import 'openai';
import './index.css';

function GenerateCharacter() {
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');
  const [hair, setHair] = useState('');
  const [eyes, setEyes] = useState('');
  const [rclass, setClass] = useState('');
  const [skinColor, setSkinColor] = useState('');
  const [age, setAge] = useState('');
  const [imageUrl, setImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generatePrompt = () => {
    return `RPG character, full body, portrait, ${race}, ${rclass}, ${gender}, ${skinColor} skin, ${hair} hair, realistic detailed ${eyes} eyes, ${age} years old, detailed face, realistic, Tolkien style, oil painting, intricate, fantasy creature, detailed, nice colors, hd, 4k, nice background, high fantasy, high quality, epic, vibrant, professional majestic oil painting by fantasy art book illustrators, volumetric lighting, dramatic, fantasy portraits, rpg portraits, full body shot, character portrait`;
  }

  const generateImage = async () => {
    setIsLoading(true);

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: "",
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: generatePrompt(),
      n: 4,
      size: '1024x1024',
    });

    const arr = Object.entries(response.data);
    setImageUrl([arr[1][1][0].url, arr[1][1][1].url, arr[1][1][2].url, arr[1][1][3].url]);

    setIsLoading(false);
  };

  return (
    <div className="App">
      <div>
        <label>Race:</label>
        <input type="text" value={race} onChange={e => setRace(e.target.value)} required />
      </div>

      <div>
        <label>Class:</label>
        <input type="text" value={rclass} onChange={e => setClass(e.target.value)} required />
      </div>

      <div>
        <label>Gender:</label>
        <input type="text" value={gender} onChange={e => setGender(e.target.value)} required />
      </div>

      <div>
        <label>Hair:</label>
        <input type="text" value={hair} onChange={e => setHair(e.target.value)} required />
      </div>

      <div>
        <label>Eyes:</label>
        <input type="text" value={eyes} onChange={e => setEyes(e.target.value)} required />
      </div>

      <div>
        <label>Skin Color:</label>
        <input type="text" value={skinColor} onChange={e => setSkinColor(e.target.value)} required />
      </div>

      <div>
        <label>Age:</label>
        <input type="text" value={age} onChange={e => setAge(e.target.value)} required />
      </div>

      <button onClick={generateImage}>Generate character</button>

      <div className="image-container">
        {isLoading ? <p>Loading...</p> :
          imageUrl.map((url, index) => (
            <img src={url} className="generated-img" alt={`generated-img-${index}`} />
          ))}
      </div>
    </div>
  );
}

export default GenerateCharacter;
