import * as actionTypes from './actionTypes'

export const getServerMessagesSuccess = (messages) => ({
    type: actionTypes.GET_MESSAGES_SUCCESS,
    payload: messages
})

export const sendMessageSuccess = (message) => ({
    type: actionTypes.SEND_MESSAGE_SUCCESS,
    payload: message
})

export const getServerMessages = (serverId, socket) => {
    socket.emit("getServerMessages", serverId)
    return (dispatch) => {
        socket.on("messages", messages => {
            return dispatch(getServerMessagesSuccess(messages))
        })
    }
}

export const sendMessage = (message) => {
    return (dispatch) => {
        return dispatch(sendMessageSuccess(message))
    }
}

