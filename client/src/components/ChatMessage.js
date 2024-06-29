import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';

const ChatMessage = ({ message }) => {

    const [pinnedMessage, setPinnedMessage] = useState(false);
    const [visibleLength, setVisibleLength] = useState(0);
    const typingSpeed = 15; // Adjust this value to change the typing speed

    useEffect(() => {
        if (visibleLength < message.content.length) {
            const timer = setTimeout(() => {
                setVisibleLength(visibleLength + 1);
            }, typingSpeed);
            return () => clearTimeout(timer);
        }
    }, [visibleLength, message.content.length, typingSpeed]);

    function handleClick() {
        if (!pinnedMessage)
            setPinnedMessage(true);
        else
            setPinnedMessage(false);
    }

    return (
        <div className={`mb-4 ${message.sender === 'User' ? 'text-right' : 'text-left'}`}>
            <p className="text-xl"><b>{message.sender === 'User' ? 'You' : 'Model'}</b></p>
            <div className={`break-words ${message.sender === 'User' ? 'bg-gray-100 rounded-2xl inline-block p-2' : 'bg-blue-100 rounded-2xl inline-block p-2'}`}>
                {message.sender === 'User' ?
                    <ReactMarkdown
                        children={message.content}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    />
                    :
                    <>
                          <ReactMarkdown
                            children={message.content.substring(0, visibleLength)}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        />
                        <div className="p-2 bg-blue-100 rounded-2xl text-right">
                            <PushPinSharpIcon className={`hover:text-blue-500 cursor-pointer ${pinnedMessage ? 'text-blue-500' : null}`} onClick={handleClick} />
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default ChatMessage;
