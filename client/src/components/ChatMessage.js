import DOMPurify from 'dompurify';
import React from 'react';

const createMarkup = (text) => {
    if (typeof text !== 'string') return { __html: '' };
    const sanitizedText = DOMPurify.sanitize(text.replace(/\n/g, '<br/>'));
    return { __html: sanitizedText };
};
export default function ChatMessage({ message }) {
    return (
        <div className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <p className="text-gray-600">{message.type === 'user' ? 'You' : 'Model'}</p>
            <div className="break-words" dangerouslySetInnerHTML={createMarkup(message.text)}></div>
        </div>
    );
}