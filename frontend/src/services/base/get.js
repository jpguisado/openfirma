import {request} from './request';

const API_URL = 'http://factoriamucha.com:8080/';

export function get (endpoint, params, options = {}) {

	const url = new URL(API_URL + endpoint);

	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

	return request(url, {
		method: 'GET',
		headers: 'headers' in options ? options.headers: {},
		...options
	}).then(
		resp => {
			return resp;
		}
	)

}