import { get } from '../base/get';
import SigningRequest from '../../models/SigningRequest/SigningRequest';

/**
 * Recupera las firmas pendientes de un usuario destinatario
 * @param {*} addressee Destinatario a consultar
 * @returns Array de objetos tipo SigningRequest
 */
export const getSigningRequestListSent = (userId, token) => {

	const auth = {headers : {'Authorization': token}};

	const projection = 'requestList'

	const endpoint = 'signingRequests/search/findSigningRequestBySender';
	
	const user = '/'+userId;

	return get(endpoint, {user, projection}, auth)
	.then(res => {

		const {signingRequests} = res._embedded;

		return signingRequests.map(signingRequestDTO => new SigningRequest(signingRequestDTO));
	});

}