import * as actionTypes from '../actions/actionTypes'

const currentServerReducer = (state = null, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_SERVER:
            return action.payload
        default:
            return state
    }
}

export default currentServerReducer