const mostrarErrorDescarga = (e) => {
	alert("Error en la descarga de datos " + e);
}

const mostrarErrorFirma = (e) => {
	alert("Error en la firma de datos " + e);
}

const firmaOk = (e) => {

	alert("Datos firmados flamamente " + e);

	// Transforma B64 a PDF
	let pdf = window.atob(e);

	// Genera un elemento
	var a = document.createElement("a");

	// Genera un enlace al elemento
	a.href = 'data:application/octet-stream;base64,' + e;

	// Descarga el documento
	a.download = "FILENAME.pdf";

	// Clica en el enlace
	a.click();

}

const firmarDocumento = (e, url) => {

	e.preventDefault();

	window.AutoScript.downloadRemoteData(url, iniciarFirma, mostrarErrorDescarga);

}

const iniciarFirma = function(datosB64) {

	window.AutoScript.sign(datosB64, "SHA512withRSA", "PAdES", null, firmaOk, mostrarErrorFirma);
}

const handleClickCrearPeticion = (e) => {


}