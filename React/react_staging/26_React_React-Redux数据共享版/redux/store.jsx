import {createStore,applyMiddleware,combineReducers} from 'redux'
import countReducer from './reducers/count'
import thunk from 'redux-thunk'
import personReducer from './reducers/person'

const allReducers = combineReducers({count:countReducer,persons:personReducer})

export default createStore(allReducers,applyMiddleware(thunk));