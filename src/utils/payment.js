import { PG_CHARGE_WALLET, PUBLIC_KEY, CUSTOMER } from '../config'
import { get, post } from './api'

export const paymentApiCharge = (chargeObj = {}) => {
	return new Promise((resolve, reject) => {
    pgData = { ...chargeObj, publicKey: PUBLIC_KEY, customer: CUSTOMER }
		post(PG_CHARGE_WALLET, pgData, false).then(response => {
			if(response && response.status && response.status === 'success') {
				resolve(response.transation);
			} else {
				reject(response)
			}
		}).catch (error => {
			reject(error)
		})
	})
}