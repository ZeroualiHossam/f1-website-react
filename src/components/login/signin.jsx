import React from 'react';
import './signin.css';
import firebase, { auth } from '../../firebase';

function Signin() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    return (
        <div className="signin-container">
            <button onClick={signInWithGoogle}> Sign In With Google</button>
        </div>
    );
}

export default Signin;