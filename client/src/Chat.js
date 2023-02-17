import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './styles/chat.css'
import { Navigate, useParams } from 'react-router-dom';



function Chat({ messages, setMessages, userId, servers }) {
    let socket = io("http://localhost:5000");
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [message, setMessage] = useState("");
    const serverId = useParams().serverId

    const is = servers.filter(server => server.server_id == serverId)

    if (is.length == 0) {
        Navigate({ to: "/home" })
    }

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("sendMessage", { username, userId, message, date: `${new Date().getHours()}:${new Date().getMinutes()}`, serverId })
        setMessages([...messages, {
            username,
            userId,
            message,
            date: `${new Date().getHours()}:${new Date().getMinutes()}`,
            serverId
        }])
        setMessage("")
    }

    useEffect(() => {
        socket.emit("getServerMessages", serverId)
        socket.on("messages", messages => {
            setMessages(messages)
        })
    }, [])


    useEffect(() => {
        document.querySelector(".messages").scrollTop = 999999999999 * 99
    }, [messages])



    return (
        <div className="chat_panel">
            <div className="header">
                <h1 className="title">Group Message</h1>
            </div>
            <div className="messages">
                {messages.map((message, i) => (
                    message.username !== username ? (
                        <div className="message" key={i}>
                            <span className="username">{message.username}</span>
                            <span className='message-content'>{message.message}</span>
                            <span>{message.date}</span>
                        </div>
                    ) : (<div className="message me" key={i}>
                        <span className="username">{message.username}</span>
                        <span className='message-content'>{message.message}</span>
                        <span>{message.date}</span>
                    </div>)
                ))}
            </div>
            <form className="form" onSubmit={sendMessage}>
                <input type="text" placeholder='User Name' disabled className='username_input' value={localStorage.getItem("username")} />
                <input placeholder='Enter Your Message!' className='message_input' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit' className='sendBtn'>Send Message</button>
            </form>
        </div>
    )
}

export default Chat
