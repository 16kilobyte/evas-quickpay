export const saveService = (service) => ({
  type: 'SAVE_SERVICE', service
})

export const quickPaymentMade = (quickpayment) => ({
  type: 'QUICK_PAYMENT_SUCCESS', oldPayment: quickpayment
})