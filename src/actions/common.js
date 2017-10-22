export const isWorking = () => dispatch => ({
  type: 'IS_READY',
})

export const isDoneWorking = () => dispatch => dispatch({
  type: 'IS_WORKING'
})

export const saveUser = (user) => ({
  type: 'SAVE_USER', user
})