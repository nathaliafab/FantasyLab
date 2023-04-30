import React, { useState } from "react";
import 'openai';
import './Story.css';
import Logo from '../../assets/Logo.png';

function GenerateStory() {
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ambiance, setAmbiance] = useState('');
    const [theme, setTheme] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [scenarioDescription, setScenarioDescription] = useState('');
    const [otherInfo, setOtherInfo] = useState('');
    const [charNames, setCharNames] = useState('');
    const [apiKey, setApiKey] = useState('');

    const generateStoryPrompt = () => {
        let prompt = `Write a RPG story with the following ambiance: ${ambiance}, theme: ${theme}.`;

        if (charNames !== '')
            prompt += ` The story may have the following characters: ${charNames}.`;

        if (otherInfo !== '')
            prompt += ` ${otherInfo}`;

        return prompt;
    }

    const generateRPGBackgroundPrompt = () => {
        return `Using this backstory: ${generateStoryPrompt()},  Please visually describe the environment in a succint way, and using only commas`;
    }

    const generateText = async () => {
        setIsLoading(true);
        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: apiKey,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: generateStoryPrompt() }],
            max_tokens: 1024,
        });

        setIsLoading(false);
        const arr = Object.entries(completion.data);
        console.log(arr[5][1][0].message.content);

        setStory(arr[5][1][0].message.content);
    };

    const generateImage = async () => {
        setIsLoading(true);
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: apiKey,
        });

        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: `${scenarioDescription}, background, illustration, digital art, intricate, detailed, nice colors, hd, 4k, high quality, epic, vibrant, professional majestic painting by art book illustrators, volumetric lighting, dramatic, art`,
            n: 4,
            size: '1024x1024',
        });
        console.log(response.data)
        const arr = Object.entries(response.data);
        setImageUrl([arr[1][1][0].url, arr[1][1][1].url, arr[1][1][2].url, arr[1][1][3].url]);
        console.log(imageUrl)
        setIsLoading(false);
    };


    const generateBackgroundCharacteristics = async () => {
        setIsLoading(true);
        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: apiKey,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: generateRPGBackgroundPrompt() }],
            max_tokens: 1024,
        });

        setIsLoading(false);
        const arr = Object.entries(completion.data);
        console.log(arr[5][1][0].message.content);
        let text = arr[5][1][0].message.content
        setScenarioDescription(text)
        await generateImage();
    }

    const handleSubmit = async () => {
        if (apiKey === '') {
            alert('Insert you API KEY!')
        } else {
            await generateText()
            await generateBackgroundCharacteristics()
        }
    }

    return (
        <div className="App">
            <div className="Data">
                <img src={Logo} className="logo" />

                <div>
                    <input placeholder="Describe the ambiance..." type="text" value={ambiance} onChange={e => setAmbiance(e.target.value)} required />
                </div>

                <div>
                    <input placeholder="Insert the main theme..." type="text" value={theme} onChange={e => setTheme(e.target.value)} required />
                </div>

                <div>
                    <input placeholder="Insert any character names..." type="text" value={charNames} onChange={e => setCharNames(e.target.value)} />
                </div>

                <div>
                    <input placeholder="Insert any other information..." type="text" value={otherInfo} onChange={e => setOtherInfo(e.target.value)} />
                </div>

                <div>
                    <input placeholder="Insert your OpenAI API KEY..." type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} />
                </div>

                <div className="generate">
                    <button onClick={handleSubmit}>Generate story</button>
                </div>

                {
                    (story !== '' || isLoading) ?  <div className="text-container">
                    {isLoading ? (
                        <p className="loading" >Loading...</p>
                    ) : (
                        <div>
                            <div className="story">
                                <p>{story}</p>
                            </div>
                            <div className="image-container">
                                {imageUrl.map((url, index) => (
                                    <img src={url} className="generated-img" alt={`generated-img-${index}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div> : <div></div>
                }
            </div>
        </div>
    );
}

export default GenerateStory;
