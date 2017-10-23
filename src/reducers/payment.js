export default (state = { transaction: {}, step: 1 }, action) => {
  switch (action.type) {
    case 'TRNX_STARTED':
      return {
        ...state,
        transaction: action.transaction,
        step: 2
      }
    case 'TRNX_COMPLETED':
      return {
        ...state,
        transaction: action.transaction,
        step: 3
      }
    default:
      return state
  }
}