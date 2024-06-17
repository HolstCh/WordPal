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

        const currentInputText = inputText.trim();
        // prevent empty input
        if (!currentInputText) {
            return;
        }

        const userChatMessage = { type: 'user', text: currentInputText };
        setChatHistory(chatHistory => [...chatHistory, userChatMessage]);

        const result = await generateText(currentInputText);
        let generatedResponse = result.generatedText;
        console.log(generatedResponse);
        
        const regex = new RegExp(`<|begin_of_text|><|start_header_id|>user<|end_header_id|>\\n\\n${currentInputText}<|eot_id|>assistant\\n\\n`, 'gi');
        generatedResponse = generatedResponse.replace(regex, '');
        generatedResponse = generatedResponse.replace(/\|{2,}/g, '');
        console.log(currentInputText);
        console.log(generatedResponse);
        const modelChatMessage = { type: 'model', text: generatedResponse };
        setChatHistory(chatHistory => [...chatHistory, modelChatMessage]);
        setInputText('');
    }

    const createMarkup = (text) => {
        if (typeof text !== 'string') return { __html: '' };
        const sanitizedText = DOMPurify.sanitize(text.replace(/\n/g, '<br/>'));
        return { __html: sanitizedText };
    };


    return (
        <section id="chat-page">
            <div className="w-1/2 bg-blue-100 p-4 shadow-md rounded-lg">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <p className="text-gray-600">{message.type === 'user' ? 'You' : 'Model'}</p>
                        <div dangerouslySetInnerHTML={createMarkup(message.text)}></div>
                    </div>
                ))}
            </div>
            <div className="w-1/2 bg-gray-200 p-4 shadow-md rounded-3xl">
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