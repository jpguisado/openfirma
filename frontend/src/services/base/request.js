import {requestInterceptor, responseInterceptor} from './Interceptors'

export function request (resource, init) {
	return requestInterceptor(resource, init)
	.then(response => {
		return responseInterceptor(response);
	})
	.catch(error => {
		console.error('Se ha producido un error en la conexión con el servidor. ' + error);
		throw error;
	})
}