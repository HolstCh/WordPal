import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import { useSelector, useDispatch } from 'react-redux';
import { pinMessage, unpinMessage } from '../redux/actions/conversationActions';

const ChatMessage = ({ message, isNewestMessage }) => {

    const [visibleLength, setVisibleLength] = useState(0);

    const typingSpeed = 15;
    const dispatch = useDispatch();

    console.log("newestMsg: ", isNewestMessage);

    useEffect(() => {
        if (isNewestMessage && visibleLength < message.content.length) {
            const timer = setTimeout(() => {
                setVisibleLength(visibleLength + 1);
            }, typingSpeed);
            return () => clearTimeout(timer);
        }
    }, [visibleLength, message.content.length, typingSpeed, isNewestMessage]);

    useEffect(() => {
        if (isNewestMessage) {
            setVisibleLength(0);
        }
    }, [isNewestMessage]);

    function handleClick(convoId, msgId, isPinnedMsg) {
        console.log(convoId, msgId);
        if (!isPinnedMsg)
        {
            dispatch(pinMessage(convoId, msgId));
        }
        else
        {
            dispatch(unpinMessage(convoId, msgId));
        }
    }

    return (
        <div id={`message-${message.id}`} className={`mb-4 ${message.sender === 'User' ? 'text-right' : 'text-left'}`}>
            <p className="text-xl"><b>{message.sender === 'User' ? 'You' : 'Model'}</b></p>
            <div className={`break-words ${message.sender === 'User' ? 'bg-gray-100 rounded-2xl inline-block p-2' : 'bg-blue-100 rounded-2xl inline-block p-2'}`}>
                {message.sender === 'User' ? (
                    <ReactMarkdown
                        children={message.content}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    />
                ) : (
                    <>
                        {isNewestMessage ? (
                            <ReactMarkdown
                                children={message.content.substring(0, visibleLength)}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            />
                        ) : (
                            <ReactMarkdown
                                children={message.content}
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            />
                        )}
                        <div className="p-2 bg-blue-100 rounded-2xl text-right">
                            <PushPinSharpIcon
                                className={`hover:text-blue-500 cursor-pointer ${message.isPinned ? 'text-blue-500' : null}`}
                                onClick={() => handleClick(message.conversationId, message.id, message.isPinned)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;