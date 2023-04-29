import React, { useState } from "react";
import 'openai';
import './History.css';

function GenerateHistory() {
    const [history, setHistory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ambiance, setAmbiance] = useState('');
    const [theme, setTheme] = useState('');
    const [otherInfo, setOtherInfo] = useState('');
    const [charNames, setCharNames] = useState('');

    const generatePrompt = () => {
        let prompt = `Write a RPG history with the following ambiance: ${ambiance}, theme: ${theme}.`;

        if (charNames !== '')
            prompt += ` The history may have the following characters: ${charNames}.`;

        if (otherInfo !== '')
            prompt += ` ${otherInfo}`;

        return prompt;
    }

    const generateText = async () => {
        setIsLoading(true);
        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: "",
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: generatePrompt() }],
            max_tokens: 1024,
        });

        setIsLoading(false);
        const arr = Object.entries(completion.data);
        console.log(arr[5][1][0].message.content);

        setHistory(arr[5][1][0].message.content);
    };

    return (
        <div className="App">
            <div>
                <label>Ambiance:</label>
                <input type="text" value={ambiance} onChange={e => setAmbiance(e.target.value)} required />
            </div>

            <div>
                <label>Theme:</label>
                <input type="text" value={theme} onChange={e => setTheme(e.target.value)} required />
            </div>

            <div>
                <label>Character names (separate by commas):</label>
                <input type="text" value={charNames} onChange={e => setCharNames(e.target.value)} />
            </div>

            <div>
                <label>Other information:</label>
                <input type="text" value={otherInfo} onChange={e => setOtherInfo(e.target.value)} />
            </div>

            <button onClick={generateText}>Generate history</button>

            <div className="text-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="history">
                        <p>{history}</p>
                    </div>
                )}
            </div>

        </div>
    );
}

export default GenerateHistory;
