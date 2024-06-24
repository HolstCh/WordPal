import React from 'react';
import ProfileMenu from './ProfileMenu'
import ChatHistorySidebar from './ChatHistorySidebar';

export default function NavBar({ openSidebar, setOpenSidebar, initialConvos }) {

    return (
        <div className="flex flex-row items-center justify-between mx-3 mt-3">
            <ChatHistorySidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} initialConvos={initialConvos} />
            <ProfileMenu />
        </div>
    );
}