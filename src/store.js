import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api'
import reducer from './reducers'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

let store = createStoreWithMiddleware(reducer);

export default store;