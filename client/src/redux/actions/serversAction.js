import * as actionTypes from './actionTypes'

export const getServersSuccess = (serverList) => ({
    type: actionTypes.GET_SERVERS_SUCCESS,
    payload: serverList
})

export const currentServer = (server) => ({
    type: actionTypes.CHANGE_CURRENT_SERVER,
    payload: server
})

export const getServers = (userId, socket) => {
    return (dispatch) => {
        socket.emit("getServers", userId)
        socket.on("servers", servers => dispatch(getServersSuccess(servers)))
    }
}