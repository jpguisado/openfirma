import { get } from '../base/get';

/**
 * 
 * @param addresseeId Usuario cuyas peticiones pendientes queremos consultar.
 * @param userToken Token que prueba la identidad del usuario
 * @returns 
 */
export const getSigningRequestCountByAddresseeService = (addresseeId, userToken) => {

	const endpoint = 'signingRequests/search/countSigningRequestPendingByAddresses/';

	const authHeader = {headers: {'Authorization' : userToken}}

	const params = {
		id : addresseeId
	};
	
	return get(endpoint, params, authHeader)
	.then(res => {
		return res;
	});

}