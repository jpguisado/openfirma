import { newUserService } from '../../../services/user.services/newUserService';
import { validateCreateForm } from '../../../hooks/validateUserForm';
import CreateUserForm from '../../CreateUserForm/Index';
import { Formik } from 'formik';
import AuthContext from '../../../context/AuthContext';
import { useContext } from 'react';
import { valuesToFormData } from '../../../helpers/valuesToFormData';

export function CreateUserFormInvocation() {

	const { currentUser, setIsLoading, showNotification } = useContext(AuthContext);

	const initialValues = {
		name: '',
		lastName1: '',
		lastName2: '',
		nif: '',
		username: '',
		language: '',
		positions: '',
		roles: '',
		avatar: '',
		password: '',
		status: 'Alta',
	}

	return (

		<Formik
			initialValues={initialValues}
			validate={validateCreateForm}
			onSubmit={(values, {setSubmitting, resetForm}) =>{

				setIsLoading(true);

				const data = valuesToFormData(values);

				newUserService(data, currentUser.token).then(

					() => {

						setSubmitting(false);

						setIsLoading(false);

						resetForm(initialValues);
	
						showNotification(true);

					}

				)

			}}
		>

			{({ isSubmitting }) => (
				<CreateUserForm isSubmitting={isSubmitting} />
			)}

		</Formik>

	)

}