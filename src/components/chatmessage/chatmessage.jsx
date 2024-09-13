import React from 'react';
import './chatmessage.css';
import { auth } from '../../firebase';

function ChatMessage({ prop }) {
    const { text, uid, photoURL } = prop;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const fallbackImage = 'URL_DE_IMAGEN_DE_RESPALDO'; 

    return (
        <div className={`message ${messageClass}`}>
            <img
                src={photoURL}
                alt="User Avatar"
                onError={(e) => e.target.src = fallbackImage}
            />
            <p>{text}</p>
        </div>
    );
}

export default ChatMessage;