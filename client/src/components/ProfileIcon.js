import React from 'react';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

export default function ProfileIcon() {
    return (
        <Avatar className="hover:bg-blue-500 cursor-pointer" sx={{ bgcolor: blue[500], width: { xs: 25, sm: 30, md: 40 }, height: { xs: 25, sm: 30, md: 40 }, fontSize: { xs: 15, sm: 20, md: 20 } }}>CH</Avatar>
    );
}