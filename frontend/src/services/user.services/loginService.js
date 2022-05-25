import { post } from '../base/post';

export const loginService = (username, password) => {

	const endpoint = 'auth/login';

	const body = {
		username: username,
		password: password
	}

	const options = { headers: { 'Content-Type': 'application/json' } }

	return post(endpoint, JSON.stringify(body), options)
	.then(res => {
		if (res) {
			return res;
		}

	}).catch(error => {
		console.error('Se ha producido un error en el proceso de autenticación ' + error);
		throw error;
	});

}