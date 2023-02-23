import * as actionTypes from '../actions/actionTypes'

const messageListReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_MESSAGES_SUCCESS:
            return action.payload
        case actionTypes.SEND_MESSAGE_SUCCESS:
            if (state.filter(message => message === action.payload) >= 0) {
                return [...state, action.payload]
            } else {
                return state
            }
        default:
            return state
    }
}

export default messageListReducer