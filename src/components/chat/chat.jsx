import React, { useEffect, useRef, useState } from 'react';
import firebase, { firestore, auth } from '../../firebase';
import ChatMessage from '../chatmessage/chatmessage';
import './chat.css';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState('');
    const [user] = useAuthState(auth);

    useEffect(() => {
        const unsubscribe = firestore.collection('messages')
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                const messages = snapshot.docs.map(doc => doc.data());
                setMessages(messages);
            });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (formValue.trim() === '') {
            return;
        }
        const { uid, photoURL } = auth.currentUser;
        await firestore.collection('messages').add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    const dummy = useRef();

    return (
        <div className='chat-room' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="chat-container" style={{ flex: 1, overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <ChatMessage key={index} prop={message} />
                ))}
                <div ref={dummy}></div>
            </div>
            {user ? (
                <form className='form-msg' onSubmit={sendMessage}>
                    <input className='input-msg' type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <button className='send-btn' type="submit" disabled={!formValue.trim()}>Send</button>
                </form>
            ) : (
                <div className='form-msg'>
                    <p style={{ color: 'white', margin: 'auto' }}>Debes iniciar sesión para enviar mensajes.</p>
                </div>
            )}
        </div>
    );
}

export default Chat;