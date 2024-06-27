﻿import React from 'react';
import ProfileMenu from './ProfileMenu'
import ChatHistorySidebar from './ChatHistorySidebar';

export default function NavBar({ initialConvos }) {

    return (
        <div className="flex flex-row items-center justify-between mx-3 mt-3">
            <ChatHistorySidebar initialConvos={initialConvos} />
            <ProfileMenu />
        </div>
    );
}