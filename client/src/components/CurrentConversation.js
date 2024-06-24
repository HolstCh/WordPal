import React from 'react';
import ChatMessage from './ChatMessage'
export default function CurrentConversation({ currentConversation }) {
    return (
        <div className="w-2/3 p-4 rounded-3xl whitespace-normal overflow-y-auto" style={{ maxHeight: 'calc(100vh - 9.3rem)' }} >
            {currentConversation.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
        </div>
    );
}