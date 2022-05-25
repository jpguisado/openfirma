import { get } from '../base/get';

/**
 * 
 * @param Document Documento que queremos consultar
 * @param userToken Token que prueba la identidad del usuario
 * @returns 
 */
export const getFileService = (documentURL, userToken) => {

	const endpoint = 'tmpDir/'+documentURL.split('/')[4];

	const authHeader = {headers: {'Authorization' : userToken}}

	const params = {};
	
	return get(endpoint, params, authHeader)
	.then(res => {
		return res;
	});

}