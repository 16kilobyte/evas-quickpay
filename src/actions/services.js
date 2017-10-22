export const saveInsurance = (insurance) => ({
  type: 'SAVE_INSURANCE', insurance
})

export const quickPaymentMade = (quickpayment) => ({
  type: 'QUICK_PAYMENT_SUCCESS', oldPayment: quickpayment
})