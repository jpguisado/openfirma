import { post } from '../base/post';

export const newPositionService = (position, userToken) => {

	const endpoint = 'positions';

	const authHeader = {
		headers : {
			'Authorization': userToken,
			'Content-Type': 'application/JSON'
		}};

	return post(endpoint, JSON.stringify(position), authHeader)
	.then((res) => {
		return res;
	});

}