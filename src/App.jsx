import React from 'react';
import './App.css';
import Main from './pages/main/main';
import SignIn from './components/login/signin';
import Chat from './components/chat/chat';
import SignOut from './components/signout/signout';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className="App">
      {user ? <Chat /> : <SignIn />}
    </div>
  );
}

export default App;