import React, { useEffect, useRef, useState } from 'react';
import firebase, { firestore, auth } from '../../firebase';
import ChatMessage from '../chatmessage/chatmessage';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState('');

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
        <div className='chat-room'>
            <div className="chat-container">
                {messages.map((message, index) => (
                    <ChatMessage key={index} prop={message} photoURL={auth.currentUser.photoURL}/>
                ))}
            </div>
            <div ref={dummy}> </div>
            <form onSubmit={sendMessage}>
                <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;