import {request} from './request';

const API_URL = 'http://factoriamucha.com:8080/';

export function post (endpoint, body, options = {}) {

	const url = new URL(API_URL + endpoint);

	return request(url, {
		method: 'POST',
		headers: 'headers' in options ? options.headers: {},
		body: body,
		...options
	})
	.then(
		resp => {
			return resp;
		}
	)
	.catch(error =>{
		console.error('Error al retornar request dentro del metodo post. ' + error);
		throw error;
	})

}