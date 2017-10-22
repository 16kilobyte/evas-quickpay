import { AsyncStorage } from 'react-native'
import { get } from './api'
import { GET_CONFIGURATIONS } from '../config/urls'

export const getConfigurations = () => {
	return new Promise(async (resolve, reject) => {
		// let token = await AsyncStorage.getItem(constants.ASYNC_STORAGE_AUTH_TOKEN);
		get(GET_CONFIGURATIONS).then(response => {
			resolve(response)
		}).catch (error => {
			reject(error);
		})
	})
}