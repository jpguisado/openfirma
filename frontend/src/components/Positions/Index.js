import { Formik } from 'formik';
import CreatePositionForm from '../CreatePositionForm/Index';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { newPositionService } from '../../services/positions/postPosition';
import { FilterableTable } from '../FilterableTable/Index';
import { Notification } from '../Notification/Index';
import { Outlet } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { FilterablePositionsTable } from '../PositionsTable/Index';

export function Positions() {

	const { currentUser, setIsLoading, showNotification } = useContext(AuthContext);

	const [isOpen, setIsOpen] = useState(false)

	const createPositionInitialValues = {
		denomination: '',
		typeOfPosition: ''
	}

	function openModal(e) {
		setIsOpen(true);
	}

	function closeModal(e) {
		setIsOpen(false)
	}

	const validateCreatePositionForm = values => {

		const errors = {};

		denomination(values, errors);
		typeOfPosition(values, errors);

		return errors;
	}

	const denomination = (values, errors) => {
		if (!values.denomination) { errors.denomination = 'Campo requerido'; }
	}

	const typeOfPosition = (values, errors) => {
		if (!values.typeOfPosition) { errors.typeOfPosition = 'Campo requerido'; }
	}

	return (

		<div className='w-full p-5'>

			<div className='h-full flex flex-col'>

				<h1 className='h-12 text-3xl'>Gestión de cargos</h1>

				<div className='flex mt-3'>

					<button onClick={openModal} id='new-position' type="button" className='border-[1px] border-sky-200 p-2 mx-1 rounded-sm cursor-pointer text-sm hover:bg-sky-200 transition-colors duration-200'>Crear cargos</button>

				</div>

				<FilterablePositionsTable />

				<Notification
					mensaje={'cargo creado correctamente.'}
				/>

			</div>

			<Outlet />

			{/* Formulario de alta de usuario y cargo */}
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
							<div className="inline-block w-fit p-6 my-8 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900">
									Añadir usuarios:
								</Dialog.Title>
								<div className="mt-2 flex items-center flex-col">

									<Formik
										initialValues={createPositionInitialValues}
										validate={validateCreatePositionForm}
										onSubmit={(values, { setSubmitting, resetForm }) => {

											setIsLoading(true);

											newPositionService(values, currentUser.token)
												.then(() => {

													setSubmitting(false);
													setIsLoading(false);
													showNotification(true);

												})

										}}

									>

										{({ isSubmitting, setFieldValue }) => (

											<CreatePositionForm isSubmitting={isSubmitting} setFieldValue={setFieldValue} />

										)}

									</Formik>

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