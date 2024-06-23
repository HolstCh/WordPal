import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';

const ChatMessage = ({ message }) => {

    const [pinnedMessage, setPinnedMessage] = useState(false);

    function handleClick() {
        if (!pinnedMessage)
            setPinnedMessage(true);
        else
            setPinnedMessage(false);
    }

    return (
        <div className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <p className="text-xl"><b>{message.type === 'user' ? 'You' : 'Model'}</b></p>
            <div className={`break-words ${message.type === 'user' ? 'bg-gray-100 rounded-2xl inline-block p-2' : 'bg-blue-100 rounded-2xl inline-block p-2'}`}>
                <ReactMarkdown
                    children={message.text}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                />
                {message.type === 'user' ? null
                    :
                    <div className="p-2 bg-blue-100 rounded-2xl text-right">
                        <PushPinSharpIcon className={`hover:text-blue-500 cursor-pointer ${pinnedMessage ? 'text-blue-500' : null}`} onClick={handleClick } />
                    </div>
                }
            </div>
        </div>
    );
};

export default ChatMessage;
