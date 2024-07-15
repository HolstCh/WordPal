import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import { useSelector, useDispatch } from 'react-redux';
import { currentConvo } from '../redux/actions/uiActions';

const ChatMessage = React.memo(({ message, isNewestMessage, handlePinMessage }) => {

    const [visibleLength, setVisibleLength] = useState(0);

    const dispatch = useDispatch();
    const typingSpeed = 2;
    const convoIdWithUserSubmit = useSelector(state => state.uiState.currentConvoId);
    const selectedConvoId = useSelector(state => state.uiState.selectedConvoId);

    console.log("newestMsg: ", isNewestMessage);

    useEffect(() => {
        if (isNewestMessage && visibleLength < message.content.length) {
            const timer = setTimeout(() => {
                setVisibleLength(visibleLength + 1);
            }, typingSpeed);
            return () => clearTimeout(timer);
        }
        else
            dispatch(currentConvo(-1));
    }, [visibleLength, message.content.length, typingSpeed, dispatch, isNewestMessage]);

    useEffect(() => {
        if (isNewestMessage) {
            setVisibleLength(0);
        }
    }, [isNewestMessage]);

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
                        {isNewestMessage && (convoIdWithUserSubmit === selectedConvoId) ? (
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
                                onClick={() => handlePinMessage(message.conversationId, message.id, message.isPinned)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.message === nextProps.message && prevProps.isNewestMessage === nextProps.isNewestMessage;
});

export default ChatMessage;