import { AsyncStorage } from 'react-native';
import { GET_CONFIGURATIONS } from '../config/urls';

export default function getConfigurations() {
	return new Promise(async (resolve, reject) => {
		// let token = await AsyncStorage.getItem(constants.ASYNC_STORAGE_AUTH_TOKEN);
		try {
			let response = await fetch(GET_CONFIGURATIONS, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'token': 'token'
				}
			});
			let responseJson = await response.json();
			resolve(responseJson);
		} catch (error) {
			console.error(`Error thrown in api/configuration/initData: ${error}`);
			reject(error);
		}
	});
}