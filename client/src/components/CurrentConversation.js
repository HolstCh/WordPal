import React from 'react';
import ChatMessage from './ChatMessage'
export default function CurrentConversation({ currentConversation }) {
    return (
        <div className="w-2/3 p-4 rounded-3xl whitespace-normal overflow-y-auto max-h-96" >
            {currentConversation.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
        </div>
    );
}