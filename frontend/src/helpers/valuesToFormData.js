export const valuesToFormData = (values) => {

	//Convertimos los metadatos a JSON
	const json = JSON.stringify(values);

	// Convertimos el JSON a fichero
	const blob = new Blob([json], {
		type: 'application/json'
	});

	// Instanciamos un objeto FormData
	// Almacenaremos los datos anteriormente tratados
	let formData = new FormData();

	// Si es una edición, tendremos la id
	if(values.id) {
		// Añadimos los metadatos al formulario
		formData.append('usuarioEditado', blob);
	} else {
		formData.append('usuarioCreado', blob);
	}

	// Añadimos el avatar al formulario
	formData.append(`avatar`, values.file);

	return formData;

}