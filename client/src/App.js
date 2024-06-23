import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Chat from './pages/Chat'
import React from 'react'
import { Routes, Route } from 'react-router-dom';

function App() {

    return (
        <Routes>
            <Route exact path="/" element={<Login /> } />
            <Route path="/signup" element={<SignUp /> } />
            <Route path="/chat" element={<Chat /> } />
        </Routes>
  );
}

export default App;