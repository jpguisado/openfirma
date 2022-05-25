import { post } from '../base/post';
import { common_conf } from '../../conf/api';

export const postSignedDocument = (pdf, signingRequestInfo) => {

	const token = {headers : {'Authorization': common_conf.TOKEN}};

	// Instanciamos un objeto FormData
	let formData = new FormData();

	//Convertimos los metadatos a JSON
	const json = JSON.stringify(signingRequestInfo);

	// Convertimos el JSON a fichero
	const blob = new Blob([json], {
		type: 'application/json'
	});

	// Añadimos los metadatos al formulario
	formData.append('meta-data', blob);

	// Añadimos el documento al formulario
	formData.append('file-data', pdf, 'fichero.pdf');

	new Response(formData).text().then(console.log) 

	const endpoint = 'signedDocuments/new';

	return post(endpoint, formData, token).then( res => {
		return res;
	});

}