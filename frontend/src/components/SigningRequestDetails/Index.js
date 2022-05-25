import { useEffect, useState } from 'react';
import DocumentPreview from '../DocumentPreview/Index';
import DocumentDetails from '../DocumentDetails/Index';

import { useAuthContext } from '../../hooks/useAuthContext';
import { getSigningRequestDetails } from '../../services/signingRequest.services/getSigningRequestDetails';

import { useSigning } from '../../hooks/useSigning';
import { useParams } from 'react-router-dom';

export default function SigningRequestDetails(props) {

	let params = useParams();

	// Obtiene el usuario autenticado del contexto
	const { currentUser } = useAuthContext();

	// Muestra u oculta la previsualización del documento
	const [preview, setPreview] = useState(true);

	// Almacena la petición de firma con la que estamos trabajando
	const [currentSigningRequest, setCurrentSigningRequest] = useState([]);

	const {signOneDocument} = useSigning(params.requestId, props.selectSigningRequestFunction);

	useEffect(() => {

		if(params.requestId){
			getSigningRequestDetails(params.requestId, currentUser.token)
			.then(resp => {
				setCurrentSigningRequest(resp);
			})
		}

	}, [currentUser.token, params.requestId]);

	/**
	 * Activa o desactiva la previsualización del documento
	 */
	function alterDocPreview(){
		setPreview(!preview);
	}

	return (

		<div id="SigningRequestComponent" className='border-l-2 w-full'>

			<div className='h-16 flex ml-2'>
				<h1 className='self-center text-2xl'>Petición seleccionada:</h1>
			</div>

			<div className="m-2 border-2 border-gray-300 bg-white">

				<div className="flex">

					<div className="flex w-full">
						<div className="p-2">
							<img className="rounded-full h-12 w-12" src={`${currentSigningRequest.senderAvatar}`} alt="" />
						</div>

						<div className="flex flex-col p-2 self-center">
							<span className="text-sm">{currentSigningRequest.senderFullName} - {currentSigningRequest.senderPosition}</span>
							<span className="self-center text-xs text-gray-600">{currentSigningRequest.requestDate}</span>
						</div>

					</div>


				</div>

				<div className='flex flex-col'>
					<div className='p-2'>{currentSigningRequest.message}</div>
					<div onMouseEnter={alterDocPreview} onMouseLeave={alterDocPreview} className='h-28 w-44 border-2 bg-gray-100 m-2'>
						<div className='h-3/4 overflow-hidden'>

							{preview ? <DocumentPreview file={currentSigningRequest.documentURI} /> : <DocumentDetails documentName={currentSigningRequest.documentsName} file={currentSigningRequest.documentURI} setPreview={setPreview} />}

						</div>

						<div className='bg-gray-100 h-1/4 flex'>
							<div className='w-1/5 self-center'>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
								</svg>
							</div>
							<div className='w-4/5 self-center text-xs truncate uppercase'>{currentSigningRequest.documentsName}</div>
						</div>
					</div>
				</div>

				<div className="flex text-sm p-1 text-gray-600">
					<div onClick={(e) => signOneDocument(e, currentSigningRequest.documentURI)} className="hover:bg-gray-200 hover:text-gray-800 cursor-pointer mx-1 p-1">Firmar</div>
				</div >

			</div >

		</div>

	);

}