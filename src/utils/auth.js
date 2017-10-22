import { LOGIN } from '../config'
import { get, post } from './api'

export const loginApi = (user) => {
	return new Promise((resolve, reject) => {
		post(LOGIN, user).then(response => {
			if(response && response.status && response.status === 'success') {
				resolve(response.message, response.token);
			} else {
				reject(response)
			}
		}).catch (error => {
			reject(error)
		})
	})
}