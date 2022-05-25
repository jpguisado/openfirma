import { patch } from '../base/patch';

export const editUserService = (user, token) => {

	const endpoint = 'users/update';

	const authHeader = {
		headers: {
			'Authorization': token,
		}
	};

	return patch(endpoint, user, authHeader)
		.then(() => {
			return true;
		}).catch((error) => {
			console.error('Error al actualizar el usuario' + error)
		});

}