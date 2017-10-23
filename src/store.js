import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import getRootReducer from './reducers'

export default getStore = (navReducer) => (createStore(
    getRootReducer(navReducer),
    undefined,
    applyMiddleware(thunk/*, logger*/)
  )
);