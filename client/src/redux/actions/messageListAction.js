import * as actionTypes from './actionTypes'
import { io } from 'socket.io-client'
let socket = io("http://localhost:5000");

export const getServerMessagesSuccess = (messages) => ({
    type: actionTypes.GET_MESSAGES_SUCCESS,
    payload: messages
})

export const sendMessageSuccess = (message) => ({
    type: actionTypes.SEND_MESSAGES_SUCCESS,
    payload: message
})


export const getServerMessages = (serverId) => {

    socket.emit("getServerMessages", serverId)
    return (dispatch) => {
        socket.on("messages", messages => {
            return dispatch(getServerMessagesSuccess(messages))
        })
    }
}

export const sendMessage = ({ username, userId, message, date, serverId }) => {
    return (dispatch) => {
        socket.emit("sendMessage", { username, userId, message, date, serverId })
        dispatch(sendMessageSuccess({ username, userId, message, date, serverId }))
    }
}

