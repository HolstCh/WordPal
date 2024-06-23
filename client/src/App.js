import ChatInterface from './components/ChatInterface'
import NavBar from './components/NavBar'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import React, {useState } from 'react'

function App() {

    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <>
        <Login/>
            {/*<SignUp/>
            <NavBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <ChatInterface openSidebar={openSidebar} />*/}
        </>
  );
}

export default App;