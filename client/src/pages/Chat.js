import React, { useState, useEffect } from 'react'
import ChatInterface from '../components/ChatInterface'
import NavBar from '../components/NavBar'
import axios from 'axios';

export default function Chat() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [initialConvos, setInitialConvos] = useState([]);

    const userId = 3;

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get(`https://localhost:7204/api/conversation/user/${userId}`);
                console.log(response.data);
                setInitialConvos(response.data);
            }
            catch (error) {
                console.error("Error: retrieving user's conversations", error);
            }
        };
        
        fetchConversations();

    }, [userId]);

    return (
        <div>
            <NavBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} initialConvos={initialConvos} />
            <ChatInterface openSidebar={openSidebar} />
        </div>
    );
}