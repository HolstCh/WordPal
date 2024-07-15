import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { pinMessage, unpinMessage } from '../redux/actions/conversationActions';
import {useDispatch } from 'react-redux';

export default function CurrentConversation({ currentConversation }) {

    const [pinnedMessages, setPinnedMessages] = useState([]);

    useEffect(() => {
        const pinnedMessageIds = [];
        currentConversation.map(msg => {
            if (msg.isPinned) {
                pinnedMessageIds.push(msg.id);
            }
        });
        setPinnedMessages(pinnedMessageIds)
        console.log("pinnedMsgIds: ", pinnedMessages);
    }, [currentConversation])

    const dispatch = useDispatch();
    function handlePinMessage(convoId, msgId, isPinnedMsg)
    {
        console.log(convoId, msgId);
        if (!isPinnedMsg) {
            dispatch(pinMessage(convoId, msgId));
        }
        else {
            dispatch(unpinMessage(convoId, msgId));
        }
    }
    function scrollNextPinnedMessage() {
        const msg = currentConversation.find(message => message.isPinned);
        if (msg.isPinned)
        {
            const messageElement = document.getElementById(`message-${msg.id}`);
            if (messageElement)
            {
                messageElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    function scrollPrevPinnedMessage() {
        const msg = currentConversation.find(message => message.isPinned);
        if (msg.isPinned) {
            const messageElement = document.getElementById(`message-${msg.id}`);
            if (messageElement) {
                messageElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    return (
        <div className="w-2/3 p-4 pt-0 rounded-3xl whitespace-normal overflow-y-auto" style={{ maxHeight: 'calc(100vh - 9.3rem)' }} >
            <div className="sticky top-0 bg-white z-10 text-center">
                <ArrowBackSharpIcon
                    className={`hover:text-blue-500 cursor-pointer`}
                    onClick={() => scrollPrevPinnedMessage()}
                />
                <ArrowForwardSharpIcon
                    className={`hover:text-blue-500 cursor-pointer`}
                    onClick={() => scrollNextPinnedMessage()}
                />
            </div>
            {currentConversation.map((message, index) => (
                <ChatMessage key={index} message={message} isNewestMessage={index === currentConversation.length - 1 && message.sender === 'Model'} handlePinMessage={handlePinMessage} />
            ))}
        </div>
    );
}