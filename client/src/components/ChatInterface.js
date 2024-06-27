﻿import axios from 'axios';
import React, { useState } from 'react';
import CurrentConversation from './CurrentConversation'
import ChatInput from './ChatInput'
import { useSelector } from 'react-redux';

export default function ChatInterface() {

    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const isSidebarOpen = useSelector((state) => state.uiState.isSidebarOpen);

    const generateText = async (inputText) => {
        try {
            const response = await axios.post('https://localhost:7204/api/huggingface/generate', { inputText });
            return response.data;
        } catch (error) {
            console.error("Error generating text", error);
        }
    }

    const getUser = async (id) => {
        try {
            const response = await axios.get(`https://localhost:7204/api/user/${id}`);
            return response;
        }
        catch (error) {
            console.error("Error creating user", error);
        }
    };

    const addMessageToConvo = async () => {
        try {
            const response = await axios.get(`https://localhost:7204/api/user/$`);
            return response;
        }
        catch (error) {
            console.error("Error creating user", error);
        }

    }

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
        const userData = await getUser(3);
        console.log(userData);
        
    }

    return (
        <section id="chat-interface" className={`${isSidebarOpen ? 'items-end' : 'items-center'} flex flex-col`}>
            <CurrentConversation currentConversation={chatHistory} />
            <ChatInput handleButtonClick={handleButtonClick} inputText={inputText} setInputText={setInputText} />
        </section>
    );
}