import * as actionTypes from './actionTypes'

export const getUserSuccess = (userInfo) => ({
    type: actionTypes.GET_USER_SUCCESS,
    payload: userInfo
})

export const getUserId = () => ({
    type: actionTypes.GET_USER_ID,
    payload: localStorage.getItem("userId")
})

export const getUser = (userId, socket) => (dispatch) => {
    socket.emit("login", { userId })
    socket.on("userInfo", user => { dispatch(getUserSuccess(user[0])) })
}


