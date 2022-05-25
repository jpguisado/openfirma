import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditUserByAdminInvocation } from '../Form/EditUserByAdminFormInvocation/Index';

export function EditUserPortal() {

	let navigate = useNavigate();

	const [editIsOpen, setEditIsOpen] = useState(true)
	
	function closeEditModal() {
		setEditIsOpen(false);
		setTimeout(() => {
			navigate('../')
		}, 1000)

	}

	return (
		<Transition appear show={editIsOpen} as={Fragment}>
			<Dialog 
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={closeEditModal}
			>
				<div className="min-h-screen px-4 text-center">
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<Dialog.Overlay className="fixed inset-0" />
					</Transition.Child>

					<span className="inline-block h-screen align-top" aria-hidden="true">
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
						<div className="inline-block w-fit p-6 my-8 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-2xl">
							<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
								Editar usuarios:
							</Dialog.Title>
							<div className="mt-2 flex items-center flex-col">

								<EditUserByAdminInvocation />

							</div>

							<div className="mt-4">
								<button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" onClick={closeEditModal}>
									Cerrar
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>);
}
