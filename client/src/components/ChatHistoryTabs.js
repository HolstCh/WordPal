import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function ChatHistoryTabs({ convos, value, handleChange }) {
   
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
            {convos.map((item, index) => (
                <Tab label={item.label} key={index} className={`${value === index ? 'bg-blue-100' : null}`}></Tab>
            ))}
            </Tabs>
        </div>
    );
}
