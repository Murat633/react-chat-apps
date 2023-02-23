import * as actionTypes from '../actions/actionTypes'

const userReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GET_USER_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default userReducer