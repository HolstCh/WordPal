﻿import React from 'react';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
export default function ChatHistorySidebar({openSidebar, setOpenSidebar }) {
    function handleClick() {
        if (!openSidebar)
            setOpenSidebar(true);
        else
            setOpenSidebar(false);

    }

    return (
        <section id="chat-history-sidebar">
            <MessageSharpIcon onClick={handleClick} className="hover:text-blue-500 cursor-pointer" sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />
            {openSidebar ?
                <div id="sidebar" className="fixed bg-gray-100 overflow-y-auto left-0 h-full border-2 border-gray-200 w-1/3 rounded-3xl"></div>
            : null
            }
        </section>
    );
}