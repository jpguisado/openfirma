import { get } from '../base/get';

/**
 * 
 * @param addresseeId Usuario cuyas peticiones pendientes queremos consultar.
 * @param userToken Token que prueba la identidad del usuario
 * @returns 
 */
export const countUsersByStatus = (userToken) => {

	const endpoint = 'users/search/activeUsersCountByStatus/';

	const authHeader = {headers: {'Authorization' : userToken}}

	const params = {
		status : "Alta",
	};
	
	return get(endpoint, params, authHeader)
	.then(res => {
		return res;
	});

}