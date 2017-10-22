export default (state = { savedInsurance: {} }, action) => {
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