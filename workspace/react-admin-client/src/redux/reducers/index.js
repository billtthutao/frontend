import {combineReducers} from 'redux'
import userReducer from './user'
import pageReducer from './page'
import pageReducer2 from './page2'

export default combineReducers({user:userReducer,pageNum:pageReducer,pageNum2:pageReducer2})