export  const transactionStarted = (transaction) => ({
  type: 'TRNX_STARTED', transaction
})

export const transactionFail = (error) => ({
  type: 'TRNX_FAIL', error
})

export const transactionVerified = (transaction) => ({
  type: 'TRNX_COMPLETED', transaction
})