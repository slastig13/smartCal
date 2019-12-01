import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import eventReducer from './events'
import shortDateReducer from './shortDate'
import venueReducer from './venues'

const reducer = combineReducers({
  user,
  events: eventReducer,
  shortDate: shortDateReducer,
  venues: venueReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
