export default (state = { savedService: {} }, action) => {
  switch (action.type) {
    case 'SAVE_INSURANCE':
      return {
        ...state,
        savedService: action.insurance
      }
  
    default:
      return state
  }
}