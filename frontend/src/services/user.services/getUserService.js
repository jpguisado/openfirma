import { get } from '../base/get';
import User from '../../models/User/Builder';

/**
 * Retorna array de objetos 'usuario' dados de alta en el sistema
 * @param {*} page Página a consultar
 * @param {*} size Tamaño de la página a consultar
 * @returns Array de objetos tipo User
 */
export const getUserService = (userToken) => {

	const endpoint = 'users';

	const authHeader = {headers: {'Authorization' : userToken}}

	const params = {
		projection : 'UserIdNameAvatar',
		size: 100
	};

	return get(endpoint, params, authHeader).then(res => {

		const {users} = res._embedded;

		return users.map(user => {
			const usuario = new User();
			usuario.setId(user.id);
			usuario.setName(user.name);
			usuario.setAvatar(user.avatar);
			usuario.build();
			return usuario;
		});
	});

}