import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function ChatHistoryTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="flex flex-col items-center h-full w-full bg-gray-100 overflow-hidden">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                orientation="vertical"
                className="flex-1 overflow-y-auto border-2"
            >
                <Tab label="Item One" className={`${value ? 'bg-blue-100' : null}`}>{value}</Tab>
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
                <Tab label="Item Five" />
                <Tab label="Item Six" />
                <Tab label="Item Eight" />
                <Tab label="Item Nine" />
                <Tab label="Item Ten" />
                <Tab label="Item Eleven" />
                <Tab label="Item Twelve" />
                <Tab label="Item Thirteen" />
                <Tab label="Item Fourteen" />
                <Tab label="Item Fifteen" />
                <Tab label="Item Sixteen" />
                <Tab label="Item Seventeen" />
            </Tabs>
        </div>
    );
}
