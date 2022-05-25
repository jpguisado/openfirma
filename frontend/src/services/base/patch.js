import {request} from './request';

const API_URL = 'http://factoriamucha.com:8080/';

export function patch (endpoint, body, options = {}) {

	const url = new URL(API_URL + endpoint);

	return request(url, {
		method: 'PATCH',
		headers: 'headers' in options ? options.headers: {},
		body: body,
		...options
	}).then(
		resp => {
			return resp;
		}
	).catch((error) => {
		console.log('errorrrr')
	})

}