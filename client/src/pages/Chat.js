import React, { useState } from 'react'
import ChatInterface from '../components/ChatInterface'
import NavBar from '../components/NavBar'

const initialConvos = [{ label: 'Convo 1' }, { label: 'Convo 2' }];
export default function Chat() {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <>
            <NavBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} initialConvos={initialConvos} />
            <ChatInterface openSidebar={openSidebar} />
        </>
    );
}