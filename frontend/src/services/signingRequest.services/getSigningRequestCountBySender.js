import { get } from '../base/get';

/**
 * 
 * @param addresseeId Usuario cuyas peticiones pendientes queremos consultar.
 * @param userToken Token que prueba la identidad del usuario
 * @returns 
 */
export const getSigningRequestCountBySender = (senderId, userToken) => {

	const endpoint = 'signingRequests/search/countSigningRequestsBySender_Id/';

	const authHeader = {headers: {'Authorization' : userToken}}

	const params = {
		status : "PENDING",
		id : senderId
	};
	
	return get(endpoint, params, authHeader)
	.then(res => {
		return res;
	});

}