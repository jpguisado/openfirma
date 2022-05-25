import { get } from '../base/get';
import SigningRequest from '../../models/SigningRequest/SigningRequest';

/**
 * Recupera las firmas pendientes de un usuario destinatario
 * @param {*} addressee Destinatario a consultar
 * @returns Array de objetos tipo SigningRequest
 */
export const getSigningRequestListByAddressee = (userId, token) => {

	const auth = {headers : {'Authorization': token}};

	const projection = 'requestList'

	const endpoint = 'signingRequests/search/findByAddresseeAndStatusEqualsOrderByRequestDateDesc';

	const status = 'PENDING';
	
	const user = '/'+userId;

	return get(endpoint, {user, status, projection}, auth)
	.then(res => {

		const {signingRequests} = res._embedded;

		return signingRequests.map(signingRequestDTO => new SigningRequest(signingRequestDTO));
	})
	.catch((error) =>{
		console.log('Error en el servicio de obtención de datos' + error)
	});

}