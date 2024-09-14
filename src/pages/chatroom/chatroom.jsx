import React from 'react';
import './chatroom.css';
import Header from '../../components/header/header';
import Chat from '../../components/chat/chat';

function ChatRoom() {
    return (
        <div>
            <div><Header/></div>
            <div className="chatroom-container">
                <Chat/>
            </div>
        </div>
    );
}

export default ChatRoom;