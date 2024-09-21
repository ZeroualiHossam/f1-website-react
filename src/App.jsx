import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import ChatRoom from './pages/chatroom/chatroom';
import Strategist from './pages/strategist/strategist';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/community" element ={<ChatRoom />} />
          <Route path="/strategist" element ={<Strategist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;