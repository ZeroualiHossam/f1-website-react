// src/firebase.jsx
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDQQdzoS631I-6SsfIuCzn3iyHfFdf_bz4",
    authDomain: "f1-website-react.firebaseapp.com",
    projectId: "f1-website-react",
    storageBucket: "f1-website-react.appspot.com",
    messagingSenderId: "1092696339044",
    appId: "1:1092696339044:web:4675776bc9f5459e2e2571"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
export default firebase;