import React from 'react';
import './chatmessage.css';
import { auth } from '../../firebase';

function ChatMessage({ prop }) {
    const { text, uid, photoURL } = prop;
    const currentUser = auth.currentUser;
    const messageClass = currentUser && uid === currentUser.uid ? 'sent' : 'received';
    const fallbackImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    return (
        <div className={`message ${messageClass}`}>
            <img className='avatar-msg'
                src={photoURL}
                alt="User Avatar"
                onError={(e) => e.target.src = fallbackImage}
            />
            <p className='text-msg'>{text}</p>
        </div>
    );
}

export default ChatMessage;