import React, { useState, useEffect } from 'react'
import ChatInterface from '../components/ChatInterface'
import NavBar from '../components/NavBar'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

export default function Chat() {

    return (
        <div>
            <NavBar />
            <ChatInterface />
        </div>
    );
}