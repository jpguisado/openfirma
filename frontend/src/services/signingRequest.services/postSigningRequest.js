import { post } from '../base/post';

export const postSigningRequest = (formData, userToken) => {

	const endpoint = 'signingRequests/new';

	const authHeader = {headers : {'Authorization': userToken}};

	return post(endpoint, formData, authHeader).then( res => {
		return res;
	});

}