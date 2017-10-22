import { QUICK_PAYMENT } from '../config'
import { get, post } from './api'

export const submitQuickPayment = (quickObj) => {
  return new Promise((resolve, reject) => {
		post(QUICK_PAYMENT, pgData).then(response => {
			if(response && response.status && response.status === 'success') {
				resolve(response);
			} else {
				reject(response)
			}
		}).catch (error => {
			reject(error)
		})
	})
}