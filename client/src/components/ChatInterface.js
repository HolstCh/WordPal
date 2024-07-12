import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CurrentConversation from './CurrentConversation'
import ChatInput from './ChatInput'
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, fetchConversationMessages } from '../redux/actions/conversationActions';
import { currentConvo, toggleTyping } from '../redux/actions/uiActions';

export default function ChatInterface() {

    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const isSidebarOpen = useSelector((state) => state.uiState.isSidebarOpen);
    const selectedConvoId = useSelector((state) => state.uiState.selectedConvoId);
    const messages = useSelector((state) => state.conversationState.messages[selectedConvoId]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedConvoId) {
            dispatch(fetchConversationMessages(selectedConvoId));
        }
    }, [selectedConvoId, dispatch]);

    useEffect(() => {
        if (messages) {
            setChatHistory(messages);
        }
    }, [messages]);

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

    const addMessageToConvo = async (message) => {
        dispatch(addMessage(selectedConvoId, message));
    };

    const handleButtonClick = async () => {

        const currentInputText = inputText.trim();
        // prevent empty input
        if (!currentInputText) {
            return;
        }

        const userChatMessage = {
            conversationId: selectedConvoId,
            sender: "User",
            content: currentInputText,
            sentAt: new Date().toISOString().slice(0, -1),
        };

        setChatHistory(chatHistory => [...chatHistory, userChatMessage]);
        await addMessageToConvo(userChatMessage);

        // generate response from hugging face API
        const result = await generateText(currentInputText);
        let generatedResponse = result.generatedText;
        console.log(generatedResponse);

        // parse through response for generated text
        const regex = /[\s\S]*assistant\s*/i;
        generatedResponse = generatedResponse.replace(regex, '');
        generatedResponse = generatedResponse.replace(/\|{2,}/g, '');
        console.log(currentInputText);
        console.log(generatedResponse);

        // create object for chat message by model
        const modelChatMessage = {
            conversationId: selectedConvoId,
            sender: "Model",
            content: generatedResponse,
            sentAt: new Date().toISOString().slice(0, -1),
        };
        setChatHistory(chatHistory => [...chatHistory, modelChatMessage]);
        await addMessageToConvo(modelChatMessage);

        setInputText('');
        const userData = await getUser(3);
        console.log(userData);

        dispatch(currentConvo(selectedConvoId));
    }

    return (
        <section id="chat-interface" className={`${isSidebarOpen ? 'items-end' : 'items-center'} flex flex-col`}>
            <CurrentConversation currentConversation={chatHistory} />
            <ChatInput handleButtonClick={handleButtonClick} inputText={inputText} setInputText={setInputText} />
        </section>
    );
}