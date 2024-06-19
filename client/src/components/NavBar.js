import React from 'react';
import PushPinSharpIcon from '@mui/icons-material/PushPinSharp';
import ProfileIcon from "./ProfileIcon";
import ChatHistory from './ChatHistory';

export default function NavBar() {



    return (
        <div className="flex flex-row items-center justify-between mx-3 mt-3">
            <ChatHistory />
            <ProfileIcon />
        </div>
    );
}