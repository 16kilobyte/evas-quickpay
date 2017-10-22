const initialState = {
  isLoggedIn: false,
  token: null,
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
   case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
        user: action.user,
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        isLoggedIn: false,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        user: {},
      }
    default:
      return state
  }
}