import { Formik } from 'formik';
import { useState } from 'react';
import { useAuth } from './useAuth';
import { validateCreatePositionForm } from './validatePositionForm';
import { newPositionService } from '../services/positions/postPosition';
import CreatePositionForm from '../components/CreatePositionForm/Index';

export function useCreatePosition() {

	const { currentUser } = useAuth();

	const [isRegisterInitiated, setRegisterState] = useState(false);

	const createPositionInitialValues = {
		denomination: '',
		typeOfPosition: ''
	}

	const createPosition = <Formik
		initialValues={createPositionInitialValues}
		validate={validateCreatePositionForm}
		onSubmit={(values, { setSubmitting, resetForm }) => {

			setRegisterState(true);

			newPositionService(values, currentUser.token)
				.then(() => {
					setSubmitting(false);
					setRegisterState(false);
					resetForm(createPositionInitialValues);
				})

		}}

	>

		{({ isSubmitting, setFieldValue }) => (

			<CreatePositionForm isSubmitting={isSubmitting} setFieldValue={setFieldValue} />

		)}

	</Formik>

	return {
		createPosition,

		isRegisterInitiated
	}

}