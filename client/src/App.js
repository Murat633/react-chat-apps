import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Chat from './Chat';
import Home from './views/Home';
import Login from './Login';

import './styles/app.css'
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';


function App() {
  let socket = io("http://localhost:5000")
  const [isLoggin, setIsLoggin] = useState(false)

  return (
    <div className='App'>
      <Navbar socket={socket} />
      <Router>
        <Routes>
          <Route path="/" element={<Login isLoggin={isLoggin} setIsLoggin={setIsLoggin} />} />
          <Route path="/home" element={<Home socket={socket} />} />
          <Route path="/chat/" element={<Chat socket={socket} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
