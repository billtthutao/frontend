import {createStore,applyMiddleware,combineReducers} from 'redux'
import countReducer from './reducers/count'
import thunk from 'redux-thunk'
import personReducer from './reducers/person'
import {composeWithDevTools} from 'redux-devtools-extension'

const allReducers = combineReducers({count:countReducer,persons:personReducer})

export default createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)));