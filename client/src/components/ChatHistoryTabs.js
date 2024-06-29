import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import nlp from 'compromise';
import { useSelector, useDispatch } from 'react-redux';

export default function ChatHistoryTabs({ value, handleChange, convoIdList }) {

    const [labels, setLabels] = useState([]);
    const conversations = useSelector((state) => state.conversationState.conversations);

    useEffect(() => {
        const loadLabels = async () => {
            //console.log("convoIdList:", convoIdList);
            //console.log(conversations);
            const sorted = [...conversations].sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
            const firstMessages = await Promise.all(sorted.map(async (convo) => {
                const messages = convo.messages;
               // console.log(`Messages for convoId ${convoId}:`, ConvoMessages);
                if (messages && messages.length > 0) {
                    const firstMessage = messages[0].content;
                    const summarizedText = nlp(firstMessage).sentences().first().out('text');
                    //console.log(`Summarized text for convoId ${convoId}:`, summarizedText);
                    return summarizedText;
                }
                else
                {
                    return 'New Conversation';
                }
            }));
            //console.log("First messages:", firstMessages);
            setLabels(firstMessages);
        };

        loadLabels();
    }, [conversations]);

    
    return (
        <div className="flex flex-col items-start ml-3 w-full bg-gray-100 overflow-hidden py-3">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                orientation="vertical"
                className="flex-1 border"
            >
            {convoIdList.map((item, index) => (
                <Tab label={labels[index]} key={item} className={`${value === index ? 'bg-blue-100' : null}`}></Tab>
            ))}
            </Tabs>
        </div>
    );
}
