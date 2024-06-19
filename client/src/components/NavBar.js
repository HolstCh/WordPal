import React from 'react';
import ProfileIcon from "./ProfileIcon";
import ChatHistorySidebar from './ChatHistorySidebar';

export default function NavBar({openSidebar, setOpenSidebar }) {

    return (
        <div className="flex flex-row items-center justify-between mx-3 mt-3">
            <ChatHistorySidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <ProfileIcon />
        </div>
    );
}