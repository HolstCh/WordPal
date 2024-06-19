import axios from 'axios';
import DOMPurify from 'dompurify';
import React, { useState, useEffect, useRef } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { debounce } from 'lodash';

export default function Input() {

    window.ResizeObserver = undefined; // could lead to questionable behaviour
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const textAreaRef = useRef(null);

    useEffect(() => {
        const textarea = textAreaRef.current;
        const debouncedResize = debounce(() => {
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        }, 500);

        if (textarea) {
            textarea.addEventListener('input', debouncedResize);
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('input', debouncedResize);
            }
        };
    }, []);


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

        const regex = /[\s\S]*assistant\s*/i;
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
        <section id="chat-page" className="flex flex-col items-center">
            <div className="w-1/2 bg-blue-100 p-4 shadow-md rounded-3xl whitespace-normal overflow-y-auto max-h-96">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <p className="text-gray-600">{message.type === 'user' ? 'You' : 'Model'}</p>
                        <div className="break-words" dangerouslySetInnerHTML={createMarkup(message.text)}></div>
                    </div>
                ))}
            </div>
            <div className="w-1/2 bg-gray-200 p-4 shadow-md rounded-3xl flex flex-row items-center">
                <TextareaAutosize
                    ref={textAreaRef}
                    minRows={1}
                    maxRows={10}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full mr-2 p-2 overflow-hidden rounded-3xl resize-none"
                />
                <SendSharpIcon onClick={handleButtonClick} sx={{ fontSize: { xs: 20, sm: 20, md: 30 } }} className="hover:text-blue-400 cursor-pointer" />
            </div>
        </section>
    );
}