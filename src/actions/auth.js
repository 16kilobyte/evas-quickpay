import { AsyncStorage } from 'react-native'
import { isWorking, isDoneWorking } from './common'
import { loginApi } from '../utils'

export const loginSuccess = (user, token) => {
  return { type: 'LOGIN_SUCCESS', token, user }
}

export const loginFail = error => {
  return { type: 'LOGIN_FAILED', error }
}

export const logoutSuccess = () => {
  return { type: 'LOGOUT_SUCCESS' }
}

export const login = (credentials, navigation, toast) => {
  return (dispatch) => {
    console.log(credentials)
    dispatch(isWorking())
    return loginApi(credentials).then(user => {
      dispatch(loginSuccess(user))
      AsyncStorage.setItem('user', JSON.stringify(user))
      dispatch(isDoneWorking())
      navigate('Menu')
    }).catch(error => {
      dispatch(loginFail(error))
      dispatch(isDoneWorking())
      toast({
        text: error.message || error,
        type: 'danger',
        duration: 5000,
      })
    })
  }
}

export const logout = (navigation) => {
  return (dispatch) => {
    return user.logout().then(() => {
      navigation.navigate('Login')
      dispatch(logoutSuccess())
    }).catch(() => {
      // dispatch(logout(error));
    })
  }
}