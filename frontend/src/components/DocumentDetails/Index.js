import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useAuth } from '../../hooks/useAuth';

export default function DocumentDetails(props) {

	const [isOpen, setIsOpen] = useState(false)
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(0);

	const {currentUser} = useAuth();

	const file = { 
		url: props.file,
		httpHeaders: 
			{'Authorization' : currentUser.token},
	}

	function openModal() {
		setIsOpen(true)
	}

	function closeModal() {
		setIsOpen(false)
		props.setPreview(true)
	}

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	function changePage(offset) {
		setPageNumber(prevPageNumber => prevPageNumber + offset);
	  }
	
	  function previousPage() {
		changePage(-1);
	  }
	
	  function nextPage() {
		changePage(1);
	  }

	return (

		<div className='bg-gray-100 h-full flex flex-col items-center'>
			<div className='h-full w-1/2 flex'>
				<a target='_blank' rel='noreferrer' className='m-auto' href={props.file}>
					<div className='w-9 h-9 bg-white hover:bg-gray-300 m-auto rounded-lg flex cursor-pointer'>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					</div>
				</a>
				<div onClick={openModal} className='w-9 h-9 bg-white hover:bg-gray-300 m-auto rounded-lg flex cursor-pointer'>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
					</svg>
				</div>
			</div>


			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-top"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-auto p-6 my-8 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900">
									{props.documentName}
								</Dialog.Title>
								<div className="mt-2 flex items-center flex-col">
									<Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
										<Page className={"h-full"} pageIndex={pageNumber} />
									</Document>
									<div>
										<p className='text-sm text-center mb-1'>Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}</p>
										<button
											className='bg-gray-500 rounded-sm text-sm text-white p-2 mr-1'
											type="button"
											disabled={pageNumber <= 1}
											onClick={previousPage}
										>
											Página anterior
										</button>
										
										<button
											className='bg-gray-500 rounded-sm text-sm text-white p-2'
											type="button"
											disabled={pageNumber >= numPages}
											onClick={nextPage}
										>
											Página siguiente
										</button>
									</div>
								</div>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={closeModal}>
											Cerrar
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>

		</div>

	)

}