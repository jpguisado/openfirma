import { get } from '../base/get';
import User from '../../models/User/Builder';

/**
 * Retorna array de objetos 'usuario' dados de alta en el sistema
 * @param {*} page Página a consultar
 * @param {*} size Tamaño de la página a consultar
 * @returns Array de objetos tipo User
 */
export const getUserDetails = (userId, userToken) => {

	const endpoint = 'users/' + userId;

	const authHeader = { headers: { 'Authorization': userToken } }

	const params = {
		projection: 'userDetails',
	};

	return get(endpoint, params, authHeader)
		.then(res => {
			const usuario = new User();
			usuario.setId(res.id)
			usuario.setName(res.name);
			usuario.setLastName1(res.lastName1)
			usuario.setLastName2(res.lastName2)
			usuario.setNif(res.nif)
			usuario.setUsername(res.username)
			usuario.setLanguage(res.language)
			usuario.setAvatar(res.avatar)
			usuario.build();
			return usuario;
		})
		.catch((error) => {
			console.error(error)
		});

}