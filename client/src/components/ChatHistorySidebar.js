import React, { useState, useEffect } from 'react';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import ToggleButtons from './ToggleButtons';
import ChatHistoryTabs from './ChatHistoryTabs';
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp';
import axios from 'axios';
export default function ChatHistorySidebar({ openSidebar, setOpenSidebar, initialConvos }) {

    const [convos, setConvos] = useState(initialConvos || []);
    const [value, setValue] = useState(0);

    useEffect(() => {
        initialConvos.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
        setValue(0);
        setConvos(initialConvos || []);
    }, [initialConvos]);

    function handleClick() {
        if (!openSidebar)
            setOpenSidebar(true);
        else
            setOpenSidebar(false);
    }

    const createConversation = async (userId) => {

        try {
            const response = await axios.post('/api/conversation', {
                userId: userId,  // Replace with the actual user ID
                startedAt: new Date().toISOString(),
                endedAt: new Date().toISOString(),
                messages: [],
            });
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddConvo = async () => {
        const newConvo = await createConversation(3);
        console.log("here", newConvo);
        if (newConvo) {
            setConvos(prevConvos => [...prevConvos, newConvo.data]);
            convos.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
            setValue(0);
        }
    }

    return (
        <section id="chat-history-sidebar">
            <MessageSharpIcon onClick={handleClick} className={`${openSidebar ? 'text-blue-500' : null} hover:text-blue-500 cursor-pointer`} sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />
            {openSidebar ?
                <div id="sidebar" className="fixed bg-gray-100 overflow-y-auto left-0 h-full border border-gray-200 w-1/3 rounded-xl">
                    <div className="flex justify-between items-center">
                        <div className="text-center ml-3">
                            <ToggleButtons />
                        </div>
                        <AddCommentSharpIcon onClick={handleAddConvo} className={`hover:text-blue-500 cursor-pointer mr-3 mt-3`} sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />
                    </div>
                    <ChatHistoryTabs convos={convos} value={value} handleChange={handleChange} />
                </div>
            : null
            }
        </section>
    );
}