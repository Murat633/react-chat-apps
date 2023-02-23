import * as actionTypes from '../actions/actionTypes'

const getUserIdReducer = (state = localStorage.getItem("userId"), action) => {
    switch (action.type) {
        case actionTypes.GET_USER_ID:
            return action.payload
        default:
            return state
    }
}

export default getUserIdReducer