import ChatInterface from './components/ChatInterface'
import NavBar from './components/NavBar'
import SignUp from './pages/SignUp'
import React, {useState } from 'react'

function App() {

    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <>
            <SignUp/>
            {/*<NavBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <ChatInterface openSidebar={openSidebar} />*/}
        </>
  );
}

export default App;