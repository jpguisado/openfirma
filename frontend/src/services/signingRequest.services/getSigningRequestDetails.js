import { get } from '../base/get';
import SigningRequest from '../../models/SigningRequest/signingRequestDetails';

/**
 * Recupera las firmas pendientes de un usuario destinatario
 * @param {*} requestId Id de la petición cuyo detalle queremos consultar
 * @param {*} userToken Token que prueba la identidad del usuario
 * @returns Array de objetos tipo SigningRequest
 */
export const getSigningRequestDetails = (requestId, userToken) => {
	
	const endpoint = 'signingRequests/'+requestId;

	const authHeader = {headers: {'Authorization' : userToken}}

	const params = {
		projection : 'requestDetails'
	};

	return get(endpoint, params, authHeader)
	.then(res => {
		return new SigningRequest(res);
	});

}