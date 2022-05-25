/**
 * 
 * @param {*} resource 
 * @param {*} init 
 * @returns 
 */
export const requestInterceptor = (resource, init = {}) => {
	return fetch(resource, {
		...init,
		headers: {
			...init.headers
		}
	})

}

export const responseInterceptor = (response) => {
	//Si la respuesta es correcta
	if(response.ok) {
		// Devolvemos en formato JSON
		return response.json();
	} else {
		// Devolvemos el error mejor formateado
		return response.json()
		.then((data) => {
			let error = new Error(data.status);
			error.response = data;
			error.status = response.status;
			throw error;
		})
	}
}