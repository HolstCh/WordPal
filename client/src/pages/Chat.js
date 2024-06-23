import React, { useState } from 'react'
import ChatInterface from '../components/ChatInterface'
import NavBar from '../components/NavBar'

export default function Chat() {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <>
            <NavBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <ChatInterface openSidebar={openSidebar} />
        </>
    );
}