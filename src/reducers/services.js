export default (state = { savedService: {} }, action) => {
  switch (action.type) {
    case 'SAVE_SERVICE':
      return {
        ...state,
        savedService: action.service
      }
    case 'QUICK_PAYMENT_SUCCESS':
      return {
        ...state,
        oldPayment: action.oldPayment
      }
    default:
      return state
  }
}