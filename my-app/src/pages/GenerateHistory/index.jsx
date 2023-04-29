import React, { useState } from "react";
import 'openai';

function GenerateHistory() {
    const [history, setHistory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generatePrompt = () => {
        return `Write a RPG fantasy history that I can work with.`;
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
        });

        setIsLoading(false);
        const arr = Object.entries(completion.data);
        console.log(arr[5][1][0].message.content);

        setHistory(arr[5][1][0].message.content);
    };

    return (
        <div className="App">
            <button onClick={generateText}>Generate history</button>
            {isLoading && <p>Loading...</p>}
            {!isLoading && history && <p>{history}</p>}
        </div>
    );
}

export default GenerateHistory;
