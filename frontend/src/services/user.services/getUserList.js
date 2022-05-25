import { get } from '../base/get';
import User from '../../models/User/Builder';

/**
 * Retorna array de objetos 'usuario' dados de alta en el sistema
 * @param {*} page Página a consultar
 * @param {*} size Tamaño de la página a consultar
 * @returns Array de objetos tipo User
 */
export const getUserList = (userToken) => {

	const endpoint = 'users';

	const authHeader = { headers: { 'Authorization': userToken } }

	const params = {
		projection: 'userList',
		size: 200,
	};

	return get(endpoint, params, authHeader)
	.then(res => {

		const { users } = res._embedded;

		return users.map(user => {
			const usuario = new User();
			usuario.setId(user.id);
			usuario.setUsername(user.username);
			usuario.setFullName(user.fullName);
			usuario.setUserStatus(user.status);
			usuario.setAvatar(user.avatar);
			usuario.build();
			return usuario;
		});

	}).catch( (error) => {
		console.error('Se ha producido un error al construir el listado de usuarios. Error: ' + error);
		return false;
	})
}