import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client'

import Chat from './Chat';
import Home from './views/Home';
import Login from './Login';

import './styles/app.css'
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';


function App() {
  let socket = io("http://localhost:5000");

  const [isLoggin, setIsloggin] = useState(false)
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([{
    username: "",
    userId: ""
  }])
  const [servers, setServers] = useState([])




  useEffect(() => {
    socket.emit("login", { userId: 1 })
    socket.on("userInfo", usr => {
      setUser(usr)
      setUsername(usr.username)
      setIsloggin(true)
    })

    socket.emit("getServers", 1)
    socket.on("servers", servers => setServers(servers))
  }, [])


  const changeUsername = (e) => {
    const value = e.target.value
    setUsername(value)
  }

  const isLogginControl = () => {
    setIsloggin(true)
  }



  return (
    <div className='App'>
      <Navbar userInfo={user} />
      <Router>
        <Routes>
          <Route path="/" element={<Login isLoggin={isLoggin} changeUsername={changeUsername} isLogginControl={isLogginControl} />} />
          <Route path="/home" element={<Home servers={servers} />} />
          <Route path="/chat/:serverId" element={<Chat servers={servers} messages={messages} userId={user.userId} setMessages={setMessages} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
