import React, { useState } from 'react';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
export default function ChatHistory() {
    const [openSidebar, setOpenSidebar] = useState(false);
    function handleClick() {
        if (!openSidebar)
            setOpenSidebar(true);
        else
            setOpenSidebar(false);

    }

    return (
        <div>
            <MessageSharpIcon onClick={handleClick} className="hover:text-blue-500 cursor-pointer" sx={{ fontSize: { xs: 25, sm: 30, md: 40 } }} />
            {openSidebar ?
                <div id="sidebar" class="left-0 h-full bg-blue-500 w-64 transform translate-x-0 transition-transform duration-200 ease-in-out"></div>
            : null
            }
        </div>
    );
}