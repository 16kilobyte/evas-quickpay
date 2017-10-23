import { PG_CHARGE_WALLET, PG_VERIFY_WALLET, PUBLIC_KEY, CUSTOMER } from '../config'
import { get, post } from './api'

export const paymentApiCharge = (chargeObj = {}) => {
	return new Promise((resolve, reject) => {
    pgData = { ...chargeObj, publicKey: PUBLIC_KEY, email: CUSTOMER, chargeWith: 'wallet' }
		post(PG_CHARGE_WALLET, pgData, false).then(response => {
			if(response && response.status && response.status === 'success') {
				resolve(response.transaction);
			} else {
				reject(response)
			}
		}).catch (error => {
			reject(error)
		})
	})
}

export const paymentApiVerify = (chargeObj = {}) => {
  return new Promise((resolve, reject) => {
    pgData = { ...chargeObj, publicKey: PUBLIC_KEY, email: CUSTOMER, chargeWith: 'wallet' }
		post(PG_VERIFY_WALLET, pgData, false).then(response => {
			if(response && response.status && response.status === 'success') {
				resolve(response.transaction);
			} else {
				reject(response)
			}
		}).catch (error => {
			reject(error)
		})
	})
}