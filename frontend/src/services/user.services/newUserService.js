import { post } from '../base/post';

export const newUserService = (formData, userToken) => {

	const endpoint = 'users/create';

	const authHeader = {
		headers : {
			'Authorization': userToken,
		}};

	return post(endpoint, formData, authHeader)
	.then(
		() => {
		return true;
	});

}