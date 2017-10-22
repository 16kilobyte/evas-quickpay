import { combineReducers } from 'redux';
import { isWorking, appStuff } from './common'
import auth from './auth'
import services from './services'
import payment from './payment'

export default getRootReducer = (navReducer) => {
  return combineReducers({
    nav: navReducer,
    app: appStuff,
    auth,
    services,
    payment,
    isWorking
  });
}

export const getIsWorking = (state) => (state.isWorking)