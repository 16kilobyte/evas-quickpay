export const isWorking = (state = true, action) => {
  switch(action.type) {
    case 'IS_READY':
      return false
    case 'IS_WORKING':
      return true
    default:
      return state
  }
}

export const appStuff = (state = { user: {}, token: '' }, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}