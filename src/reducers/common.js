export const isWorking = (state = false, action) => {
  switch(action.type) {
    case 'IS_READY':
      return false
    case 'IS_WORKING':
      return true
    default:
      return state
  }
} 