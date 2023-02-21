import * as actionTypes from '../actions/actionTypes'
import { io } from 'socket.io-client'

const messageListReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case actionTypes.GET_MESSAGES_SUCCESS:
            return action.payload
        case actionTypes.SEND_MESSAGES_SUCCESS:
            return newState = [...state, action.payload]
        default:
            return state
    }
}

export default messageListReducer