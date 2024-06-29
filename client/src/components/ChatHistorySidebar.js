import React, { useState, useEffect } from 'react';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import ToggleButtons from './ToggleButtons';
import ChatHistoryTabs from './ChatHistoryTabs';
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, selectConvo } from '../redux/actions/uiActions';
import { fetchConversations, addConversation } from '../redux/actions/conversationActions';
export default function ChatHistorySidebar() {

    const [value, setValue] = useState(0);
    const [convoIdList, setConvoIdList] = useState([]);

    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.uiState.isSidebarOpen);
    const conversations = useSelector((state) => state.conversationState.conversations);

    useEffect(() => {
        dispatch(fetchConversations(3));
    }, [dispatch]);

    useEffect(() =>
    {
        if (conversations.length > 0)
        {
            const sorted = [...conversations].sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
            const convoIds = sorted.map(convo => convo.id);
            setConvoIdList(convoIds);
            setValue(0);
            dispatch(selectConvo(convoIds[0]));
            console.log("initial", conversations);
        }
    }, [conversations, dispatch]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(selectConvo(convoIdList[newValue]));
    };

    const handleAddConvo = async () => {
        await dispatch(addConversation(3));
    };

    return (
        <section id="chat-history-sidebar">
            <MessageSharpIcon onClick={() => dispatch(toggleSidebar())} className={`${isSidebarOpen ? 'text-blue-500' : null} hover:text-blue-500 cursor-pointer`} sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />
            {isSidebarOpen ?
                <div id="sidebar" className="fixed bg-gray-100 overflow-y-auto left-0 h-full border border-gray-200 w-1/3 rounded-xl">
                    <div className="flex justify-between items-center">
                        <div className="text-center ml-3">
                            <ToggleButtons />
                        </div>
                        <AddCommentSharpIcon onClick={handleAddConvo} className={`hover:text-blue-500 cursor-pointer mr-3 mt-3`} sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />
                    </div>
                    <ChatHistoryTabs key={convoIdList.join('-')} value={value} handleChange={handleChange} convoIdList={convoIdList} />
                </div>
            : null
            }
        </section>
    );
}