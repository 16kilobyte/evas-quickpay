import { BASE } from '../config'

export const get = (endpoint) => {
  endpoint = BASE.concat(endpoint)
  return new Promise(async (resolve, reject) => {
		try {
			let response = await fetch(endpoint, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
			let responseJson = await response.json()
			resolve(responseJson)
		} catch (error) {
			console.error(`Error thrown in api/login: ${error}`)
			reject(error)
		}
	})
}

export const post = (endpoint, body, merge = true) => {
  if(merge) endpoint = BASE.concat(endpoint)
  body = JSON.stringify(body)
  return new Promise(async (resolve, reject) => {
		try {
			let response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body
			})
			let responseJson = await response.json()
			resolve(responseJson)
		} catch (error) {
			console.error(`Error thrown in api/login: ${error}`)
			reject(error)
		}
	})
}