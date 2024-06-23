import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function ChatHistoryTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 overflow-hidden py-3">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                orientation="vertical"
                className="flex-1 border"
            >
                <Tab label="Item One" className={`${value ? 'bg-blue-100' : null}`}>{value}</Tab>
            </Tabs>
        </div>
    );
}
