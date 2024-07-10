import React, { useEffect } from 'react';
import ChatMessage from './ChatMessage'

export default function CurrentConversation({ currentConversation }) {
    useEffect(() => {
        const pinnedMessage = currentConversation.find(message => message.isPinned);
        if (pinnedMessage) {
            const messageElement = document.getElementById(`message-${pinnedMessage.id}`);
            console.log(messageElement);
            if (messageElement) {
                messageElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [currentConversation]);

    return (
        <div className="w-2/3 p-4 rounded-3xl whitespace-normal overflow-y-auto" style={{ maxHeight: 'calc(100vh - 9.3rem)' }} >
            {currentConversation.map((message, index) => (
                <ChatMessage key={index} message={message} isNewestMessage={index === currentConversation.length - 1 && message.sender === 'Model'} />
            ))}
        </div>
    );
}