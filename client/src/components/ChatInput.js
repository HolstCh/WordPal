import React from 'react';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
export default function ChatInput({ inputText, setInputText, handleButtonClick }) {
    window.ResizeObserver = undefined; // could lead to questionable behaviour

    return (
        <div className="w-2/3 bg-gray-200 p-4 shadow-md rounded-3xl flex flex-row items-center">
            <TextareaAutosize
                minRows={1}
                maxRows={10}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full mr-2 p-2 overflow-hidden rounded-3xl resize-none"
            />
            <SendSharpIcon onClick={handleButtonClick} sx={{ fontSize: { xs: 20, sm: 20, md: 30 } }} className="hover:text-blue-400 cursor-pointer" />
        </div>
    );
}
