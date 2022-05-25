import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessageItem(props) {

	let navigate = useNavigate();
	
	const checkInput = useRef(null);

	useEffect(() => {
		if (props.selectedSigningRequestId === '') {
			checkInput.current.checked = false;
		}
	}, [props.selectedSigningRequestId])

	/**
	 * Marca una petición como seleccionada
	 * y pasa la id de la petición al componente OpenFirma
	 */
	const seleccionarPeticion = () => {

		checkInput.current.checked = !checkInput.current.checked;

		if (checkInput.current.checked) {
			props.selectSigningRequestFunction(checkInput.current.value);
			navigate(`${checkInput.current.value}`)
		} else {
			props.selectSigningRequestFunction('');
			navigate("./")
		}
	}

	return (
		<div className="h-auto p-2 flex hover:bg-gray-100 border-t-2 cursor-pointer select-none" onClick={seleccionarPeticion}>

			<div className="w-1/12 text-center self-center">
				<input onClick={seleccionarPeticion} ref={checkInput} type="checkbox" id="request-1" className="rounded text-red-600" name="select-all" value={props.id} />
			</div>

			<div className="w-11/12 flex flex-col">
				<div className="w-full h-1/3 flex justify-between items-center">
					<h1>{props.remitente}</h1>
					<span className="text-xs bg-white ring-1 ring-sky-400 text-gray-900 p-1 rounded-full">{props.fEnvio}</span>
				</div>
				<div className="w-full h-1/3 flex items-center text-sm text-gray-700">{props.fichero}</div>
				<div className="w-full h-1/3 flex items-center text-xs antialiased mt-1 text-gray-600">{props.mensaje}</div>
			</div>
		</div>
	);
}