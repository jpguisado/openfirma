import { useContext, useEffect, useState } from 'react';
import { getUserDetails } from '../../../services/user.services/getUserDetails';
import { valuesToFormData } from '../../../helpers/valuesToFormData'
import { validateUpdateFormByAdmin } from '../../../hooks/validateUserForm';
import { Formik } from 'formik';
import { editUserService } from '../../../services/user.services/editUserDetails';
import { useParams } from 'react-router-dom';
import { EditUserByAdminForm } from '../../EditUserByAdminForm/Index'
import AuthContext from '../../../context/AuthContext';

export function EditUserByAdminInvocation() {

	const { currentUser, setIsLoading, showNotification } = useContext(AuthContext);

	const [fetchedValues, setInitialValues] = useState({
		id: '',
		name: '',
		lastName1: '',
		lastName2: '',
		nif: '',
		language: '',
		username: '',
		password: '',
		positions: '',
		roles: '',
		status: '',
		avatar: '',
		file: '',
	});

	const { userId } = useParams();

	const initialValues = {
		id: fetchedValues.id,
		name: fetchedValues.name,
		lastName1: fetchedValues.lastName1,
		lastName2: fetchedValues.lastName2,
		nif: fetchedValues.nif,
		language: fetchedValues.language,
		username: fetchedValues.username,
		password: fetchedValues.password,
		positions: fetchedValues.positions,
		roles: fetchedValues.roles,
		status:fetchedValues.status,
		avatar:fetchedValues.avatar,
		file: fetchedValues.file,
	}

	useEffect(() => {
		if (userId !== null) {
			getUserDetails(userId, currentUser.token)
				.then((response) => {
					if (response) {
						setInitialValues(response);
					} else {
						throw new Error('Error al recuperar los detalles del usuario. El resultado de la consulta es undefined');
					}
				})
				.catch((error) => {
					console.error(error);
				})
		}

	}, [currentUser, userId]);

	const cleanUndefinedValues = (values) => {

		const filterValues = Object.entries(values).filter((elemento, i) => {

			if (elemento[0] === 'id') {
				return elemento[1];
			}

			return (elemento[1] !== Object.values(initialValues)[i]);
		});

		return Object.fromEntries(filterValues);

	}
	
	return (

		<Formik
			enableReinitialize={true}
			initialValues={initialValues}
			validate={validateUpdateFormByAdmin}
			onSubmit={(values, { setSubmitting, setStatus }) => {

				setIsLoading(true);

				const filteredValues = cleanUndefinedValues(values);

				if (Object.keys(filteredValues).length > 1) {

					const data = valuesToFormData(filteredValues);

					editUserService(data, currentUser.token)
						.then(

							() => {

								setStatus('');

								setSubmitting(false);

								setIsLoading(false);

								showNotification(true);

							}
						)
						.catch(error => {
							setStatus('Se ha producido un error al envíar el formulario. ' + error)

						});

				} else {
					setStatus('No has alterado ningún dato.');
					setIsLoading(false);
				}

			}}
		>

			{({ isSubmitting, status }) => (
				<EditUserByAdminForm estado={status} editedUserId={initialValues.id} isSubmitting={isSubmitting} />
			)}

		</Formik>


	)

}