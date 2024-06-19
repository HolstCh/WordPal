import ChatInterface from './components/ChatInterface'
import NavBar from './components/NavBar'
import React, {useState } from 'react'

function App() {

    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <>
            <NavBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <ChatInterface openSidebar={openSidebar} />
        </>
  );
}

export default App;
