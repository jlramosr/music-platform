import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import ui from 'store/reducers/ui'

const composeEnhancers = 
  (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const reducer = combineReducers({
  ui
})

export default createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
)