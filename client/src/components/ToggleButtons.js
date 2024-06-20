import React, {useState } from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

export default function ToggleButtons() {
    const [tab, setTab] = useState('history');

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <div className=" flex flex-col items-center">
            <ToggleButtonGroup
                color="primary"
                value={tab}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                className="mt-2"
            >
                <ToggleButton sx={{ width: { xs: 25, sm: 40, md: 60 }, height: { xs: 25, sm: 30, md: 40 } }} value="history"><HistorySharpIcon /></ToggleButton>
                <ToggleButton sx={{ width: { xs: 25, sm: 40, md: 60 }, height: { xs: 25, sm: 30, md: 40 } }} value="pinned"><PushPinSharpIcon /></ToggleButton>
                <ToggleButton sx={{ width: { xs: 25, sm: 30, md: 60 }, height: { xs: 25, sm: 30, md: 40 } }} value="search"><SearchSharpIcon /></ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}