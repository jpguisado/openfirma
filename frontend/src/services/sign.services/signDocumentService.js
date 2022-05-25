import { postSignedDocument } from '../signingRequest.services/postSignedDocument';

export const dataURItoBlob = (signedDocument, callback) => {

	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = window.atob(signedDocument);

	// // separate out the mime component
	// var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	var bb = new Blob([ab]);
	return bb;
}

export const unsuccessfulSigning = (e) => {

	// Llamo al mecanismo de gestión de errores

}

export const successfulSigning = (signedDocument, certificateB64) => {

	// Llamamos a la función que transformará el fichero B64 a Blob (PDF)
	const pdf = dataURItoBlob(signedDocument);

	console.log(pdf);

	// Llamo al servicio de almacenamiento de ficheros
	// Almaceno el documento firmado y la actualización del estado de la petición
	// postSignedDocument(pdf, signingRequestInfo);
	// myDisplayer(pdf);
}

/**
 * Llama a la función que invoca al script de firma.
 * Si finaliza con éxito, llama a successfulSigning,
 * pasándole el fichero firmado, el certificado y metadatos
 * @param {*} datosB64 Datos a firmar en B64
 */
const signingFunction = function (datosB64) {

	window.AutoScript.sign(
		datosB64,
		"SHA512withRSA",
		"PAdES",
		null,
		successfulSigning,
		unsuccessfulSigning
	);
}


/**
 * 
 * @param {*} documentUrl 
 */
export function getSigned(documentUrl) {
	window.AutoScript.downloadRemoteData(documentUrl, signingFunction, unsuccessfulSigning);
}

