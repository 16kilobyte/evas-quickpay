import { urls } from '../config/urls';

export default function login(user) {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await fetch(urls.LOGIN, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user)
			});
			let responseJson = await response.json();
			resolve(responseJson);
		} catch (error) {
			console.error(`Error thrown in api/login: ${error}`);
			reject(error);
		}
	});
}