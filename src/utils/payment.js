import { PG_CHARGE_WALLET, PG_VERIFY_WALLET, PUBLIC_KEY, CUSTOMER, INSURANCE_PUBKEY, DEV_WALLET } from '../config'
import { get, post } from './api'

export const paymentApiCharge = (chargeObj = {}) => {
	return new Promise((resolve, reject) => {
		if(chargeObj.serviceType === 'insurance' && INSURANCE_PUBKEY) {
			chargeObj.publicKey = INSURANCE_PUBKEY
		} else {
			chargeObj.publicKey = PUBLIC_KEY
		}
		chargeObj.email = CUSTOMER
		chargeObj.commission = 110
		chargeObj.commissionWallet = DEV_WALLET
		chargeObj.chargeWith = 'wallet'
		post(PG_CHARGE_WALLET, chargeObj, false).then(response => {
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
		if(chargeObj.serviceType === 'insurance' && INSURANCE_PUBKEY) {
			chargeObj.publicKey = INSURANCE_PUBKEY
		} else {
			chargeObj.publicKey = PUBLIC_KEY
		}
		chargeObj.chargeWith = 'wallet'
		post(PG_VERIFY_WALLET, chargeObj, false).then(response => {
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