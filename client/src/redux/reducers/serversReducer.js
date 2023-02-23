import * as actionTypes from '../actions/actionTypes'



const serversReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_SERVERS_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default serversReducer