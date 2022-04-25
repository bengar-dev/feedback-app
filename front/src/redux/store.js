import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import productReducer from './reducers/productReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    productReducer,
    userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))