import { applyMiddleware, createStore } from "redux"
import reducers from "../reducers"
import Thunk from 'redux-thunk'


const configureStore = () => {
    return createStore(reducers, applyMiddleware(Thunk))
}


export default configureStore