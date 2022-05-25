import { InlineError } from '../InlineError/Index';
import React, { useRef } from "react";
import { useState } from 'react';
import { postSigningRequest } from '../../services/signingRequest.services/postSigningRequest';
import ComboBox from '../Combobox/Index';
import CustomButton from "../CustomButton/Index";
import { Tag } from '../Tag/Index';
import AttachedFile from '../AttachedFile/Index';
import LoadingBar from '../LoadingBar/Index';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function NewSigningRequest(props) {

	const { currentUser } = useAuthContext();

	const fichero = useRef()

	const [charsLength, setChars] = useState(0);

	const [charsLimit, setLimit] = useState(false);

	const [message, setMessage] = useState(false);

	const [selectedDestinataries, setSelectedDestinataries] = useState([]);

	const [attachedFileList, setAttachedFileList] = useState([]);

	const [barPosition, setBarPosition] = useState(false);

	const [formError, setFormError] = useState({})

	let navigate = useNavigate();

	/**
	 * Activate the file selector of the OS.
	 * @param {event} event 
	 */
	const handleFileInput = (e) => {
		e.preventDefault();
		fichero.current.click();
	}

	/**
	 * Counts characteres left 
	 */
	const countsCharactersLeft = (e) => {

		e.target.value.length >= 400 ? setLimit(true) : setLimit(false);

		setChars(e.target.value.length);

		setMessage(e.target.value);

	}

	const addDestinataryToList = (destinatary) => {

		// Extraemos un array solo con el nombre de los destinatarios
		const existing = (selectedDestinataries.map((element) => {
			return element.name;
		}))

		// Nos permite comprobar si el usuario existe
		function checkAvailability(arr, val) {
			return arr.some(function(arrVal) {
			  return val === arrVal;
			});
		}

		/**
		 * Comprobamos si el usuario ya existe en los destinatarios
		 */
		if(!checkAvailability(existing, destinatary.name)) {
			setSelectedDestinataries(selectedDestinataries => [...selectedDestinataries, destinatary]);
		}

		if(formError.destinatary === true) {
			console.log(formError.destinatary);
			validateSigningRequestRequisites();
		}

	}

	const deleteDestinatariesFromList = (id) => {
		setSelectedDestinataries(selectedDestinataries.filter(element => {
			return element.id !== parseInt(id);
		}));

	}

	function addFiletoList(e){

		e.preventDefault();

		const files = fichero.current.files;

		// Añadimos los documentos al estado
		for (let i = 0; i < files.length; i++) {
			setAttachedFileList(attachedFileList => [...attachedFileList, files.item(i)]);
		}

	}


	const removeFileFromList = (lastModified) => {
		setAttachedFileList(attachedFileList.filter(element => {
			return element.lastModified !== parseInt(lastModified);
		}));
	}

	const validateSigningRequestRequisites = (e) => {

		setBarPosition(true);

		e.preventDefault();

		const signingRequestDetails = {
			sender: `/users/${currentUser.id}`,
			status: 'PENDING',
			addressee: selectedDestinataries.map((element => {
				return `/users/${element.id}`
			})),
			message: message,
		};

		const documents = attachedFileList;
		
		const evaluaciones = {}

		if (signingRequestDetails.sender === null) {
			evaluaciones.destinatary = true;
		}

		if (signingRequestDetails.addressee.length === 0) {
			evaluaciones.destinatary = true;
		}

		if (documents.length === 0) {
			evaluaciones.documents = true
		}


		documents.forEach(element => {
			if(element.type !== 'application/pdf') {
			evaluaciones.documentType = true
			}
		});

		setFormError(evaluaciones);

		if(!evaluaciones.destinatary && !evaluaciones.documents && !evaluaciones.sender && !evaluaciones.docmentType) {
			newSigningRequestInstance(signingRequestDetails, documents);
		} else {
			setBarPosition(false)
		}

	}

	const newSigningRequestInstance = (signingRequestDetails, files) => {

		//Convertimos los metadatos a JSON
		const json = JSON.stringify(signingRequestDetails);

		// Convertimos el JSON a fichero
		const blob = new Blob([json], {
			type: 'application/json'
		});

		// Instanciamos un objeto FormData
		// Almacenaremos los datos anteriormente tratados
		let formData = new FormData();

		// Añadimos los metadatos al formulario
		formData.append('meta-data', blob);

		// Añadimos los documentos al formulario
		for (let i = 0; i < files.length; i++) {
			formData.append(`file-data`, files[i]);
		}

		postSigningRequest(formData, currentUser.token)
			.then(
				setAttachedFileList([]),
				setSelectedDestinataries([]),
				setTimeout(() => {
					setBarPosition(false);
					navigate("/firmas/inbox");
				}, 2000),
			)
	}

	return (

		<div id="SigningRequestComponent" className='w-full border-l-2'>

			<div className='h-16 flex ml-2'>
				<h1 className='self-center text-2xl'>Crear una nueva petición:</h1>
			</div>

			<div className="m-2 border-2 border-gray-300 bg-white">
				
				{barPosition ? <LoadingBar bgColor={'bg-red-500'}/> : ''}

				<form className='p-2 flex flex-col'>

					<div className='flex'>

						<div className='h-1/4 m-auto w-full flex flex-wrap'>
							{selectedDestinataries.map((element) => {
								return <Tag
									key={element.id}
									fullName={element.name}
									id={element.id}
									deleteDestinatariesFromList={deleteDestinatariesFromList}
								/>
							})}
							<ComboBox
								addDestinataryToList={addDestinataryToList}
							/>

						</div>

					</div>

					{formError.destinatary ? <InlineError message={'Ups! Indica un destinatario'}/> : ''}

					<div className='flex'>

					{attachedFileList.length !== 0 ? 
						attachedFileList.map((element) => {
							return <AttachedFile
								key={element.lastModified} 
								fileName={element.name}
								fileSize={element.size}
								id={element.lastModified}
								removeFileFromList={removeFileFromList}
								/>;
						})
						: 
					<div className="h-10"></div>}

					</div>

					{ formError.documents ? <InlineError message={'Ups! Parece que no has cargado el documento'}/> : ''}
					{ formError.documentType ? <InlineError message={'¡Vaya! Alguno de los ficheros no son PDF.'}/> : ''}

					<hr className='my-2'/>

					<textarea name='message' onChange={countsCharactersLeft} className="pl-2 p-1 text-sm focus:outline-none focus:ring-0 border-0 w-1/2 min-w-96" rows="4" maxLength="500" placeholder="Si lo necesitas, redacta un mensaje" />
					<div className="pl-2 p-1 mb-2 h-5 text-sm text-gray-500">{charsLimit ? `Estás llegando al límite de carácteres: ${charsLength}/500` : ''}</div>

					<div className="flex w-1 h-1 invisible">
						<input type="file" id="fichero" onChange={addFiletoList} multiple={true} className="" ref={fichero} />
					</div >

					<div className='flex'>
						<div onClick={handleFileInput}>
							<CustomButton
								id="attach-document"
								COLOR={'ring-1 ring-sky-600'}
								HOVER={'hover:bg-sky-200'}
								SIZE="MEDIUM"
								tag={"Adjuntar"}
								type={'file'}
							/>
						</div>

						<Link to='../'>
							<CustomButton
								id="cancel-request"
								COLOR={'ring-1 ring-rose-600'}
								HOVER={'hover:bg-rose-200'}
								SIZE="MEDIUM"
								tag={"Descartar"}
							/>
						</Link>

						<div onClick={validateSigningRequestRequisites}>
							<CustomButton
								id="send-request"
								COLOR={'ring-1 ring-emerald-600'}
								HOVER={'hover:bg-emerald-200'}
								SIZE="MEDIUM"
								tag={"Enviar"}
							/>
						</div>
					</div>
				</form>

			</div>

		</div>


	)

}