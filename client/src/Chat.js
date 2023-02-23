import React, { useEffect, useState } from 'react'
import './styles/chat.css'
import { Navigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getServerMessages, sendMessage } from './redux/actions/messageListAction';
import { connect } from 'react-redux'
import { currentServer } from './redux/actions/serversAction';
import { getUser } from './redux/actions/userAction';


function Chat({ messages, userId, user = null, actions, currentServer, socket }) {
    const [message, setMessage] = useState("");

    if (!currentServer) {
        Navigate({ to: "/home" })
    }

    useEffect(() => {
        if (userId) {
            actions.getUser(Number(userId), socket) // getUserIdReducer            
        }

        if (currentServer) {
            actions.getMessages(currentServer.server_id, socket)
        }

        socket.on("message", (message) => {
            actions.sendMessage(message)
        })
    }, [])

    useEffect(() => {
        document.querySelector(".messages").scrollTop = 999999999999 * 99
    }, [messages])


    const sendMessage = (e) => {
        e.preventDefault();
        const msg = {
            id: (1 + Math.random() * 89798 / 3) + (1 + Math.random() * 89798) * 1 + Math.random() * 89,
            username: user.username,
            userId,
            message,
            date: `${new Date().getHours()}:${new Date().getMinutes()}`,
            serverId: currentServer.server_id
        }
        socket.emit("sendMessage", msg)
        actions.sendMessage(msg)
        setMessage("")
    }



    return (
        <div className="chat_panel">
            <div className="header">
                <h1 className="title">Group Message</h1>
            </div>
            <div className="messages">
                {messages.map((message, i) => {
                    if (message.serverId === currentServer.server_id) {
                        return (
                            (message.userId !== userId) ? (
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
                        )
                    }
                })}
            </div>
            <form className="form" onSubmit={sendMessage}>
                <input type="text" placeholder='User Name' disabled className='username_input' value={user ? user.username : ""} />
                <input placeholder='Enter Your Message!' className='message_input' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit' className='sendBtn'>Send Message</button>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        messages: state.messageListReducer,
        servers: state.serversReducer,
        user: state.userReducer,
        userId: state.getUserIdReducer,
        currentServer: state.currentServerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getMessages: bindActionCreators(getServerMessages, dispatch),
            sendMessage: bindActionCreators(sendMessage, dispatch),
            currentServer: bindActionCreators(currentServer, dispatch),
            getUser: bindActionCreators(getUser, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
