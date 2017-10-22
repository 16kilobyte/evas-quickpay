import { combineReducers } from 'redux';
import { isWorking } from './common'
import auth from './auth'
import services from './services'

export default getRootReducer = (navReducer) => {
  return combineReducers({
    nav: navReducer,
    auth,
    services,
    isWorking
  });
}

export const getIsWorking = (state) => (state.isWorking)