import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';

export default function Input() {

    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);


    const generateText = async (inputText) => {
        try {
            const response = await axios.post('https://localhost:7204/api/huggingface/generate', { inputText });
            return response.data;
        } catch (error) {
            console.error("Error generating text", error);
        }
    }

    // Example of using the function
    const handleButtonClick = async () => {

        // prevent empty input
        if (!inputText.trim()) {
            return;
        }

        const userChatMessage = [...chatHistory, { type: 'user', text: inputText }];
        setChatHistory(userChatMessage);

        const result = await generateText(inputText);
        let generatedResponse = result.generatedText;
        
        generatedResponse.replace(new RegExp(inputText, 'gi'), '');
        console.log(inputText);
        console.log(generatedResponse);
        const modelChatMessage = [...chatHistory, { type: 'model', text: generatedResponse }];
        setChatHistory(modelChatMessage);

        setInputText('');
    }

    const createMarkup = (text) => {
        if (typeof text === 'undefined' || text === null) return { __html: '' }; 
        const sanitizedText = DOMPurify.sanitize(text.replace(/\n/g, '<br/>'));
        return { __html: sanitizedText };
    };

    return (
        <section id="chat-page">
            <div className="w-1/2 bg-blue-100 p-4 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800">Hello, Tailwind!</h1>
                <p className="text-blue-600 mt-2">This is a Tailwind CSS example in React.</p>
                {chatHistory.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <p className="text-gray-600">{message.type === 'user' ? 'You' : 'Model'}</p>
                        <div dangerouslySetInnerHTML={createMarkup(message.text)}></div>
                    </div>
                ))}
            </div>
            <div className="w-1/2 bg-gray-200 p-4 shadow-md rounded-3xl">
                <h1 className="text-2xl font-bold text-gray-800">Hello, Tailwind!</h1>
                <p className="text-blue-600 mt-2">This is a Tailwind CSS example in React.</p>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={handleButtonClick}>
                    Click
                </button>
            </div>
        </section>
       
    );

}