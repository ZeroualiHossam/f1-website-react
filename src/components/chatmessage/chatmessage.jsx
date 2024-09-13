import React from 'react';
import { auth } from '../../firebase';
import './chatmessage.css';

function ChatMessage({ prop, photoURL }) {
    const { text, uid } = prop;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL}></img>
            <h1>{text}</h1>
        </div>
    );
}

export default ChatMessage;