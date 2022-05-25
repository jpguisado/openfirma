import { validateUpdateUserByUser } from '../../../hooks/validateUserForm';
import { EditProfile } from '../../EditProfile/Index';
import { editUserService } from '../../../services/user.services/editUserDetails';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { getUserDetails } from '../../../services/user.services/getUserDetails';
import { Formik } from 'formik';
import User from '../../../models/User/Builder';
import { valuesToFormData } from '../../../helpers/valuesToFormData';

export function ProfileFormInvocation() {

	const { currentUser, setValue, setIsLoading, showNotification } = useContext(AuthContext);

	const [initialValues, setInitialValues] = useState({
		name: '',
		lastName1: '',
		lastName2: '',
		nif: '',
		language: '',
		avatar: '',
		file: '',
	});

	useEffect(() => {
		if (currentUser.id !== null) {
			getUserDetails(currentUser.id, currentUser.token)
				.then((response) => {
					setInitialValues(response);
				})
		}

	}, [currentUser]);

	const updateCurrentUser = (nuevoUsuario) => {
		setValue(nuevoUsuario);
		setInitialValues(nuevoUsuario);
	}

	return (

		<Formik
			enableReinitialize={true}
			initialValues={initialValues}
			validate={validateUpdateUserByUser}
			onSubmit={(values, { setSubmitting }) => {

				setIsLoading(true);

				const data = valuesToFormData(values);

				editUserService(data, currentUser.token).then(

					() => {

						const usuario = new User();

						usuario.setId(values.id);
						usuario.setName(values.name);
						usuario.setLastName1(values.lastName1);
						usuario.setLastName2(values.lastName2);
						usuario.setNif(values.nif);
						usuario.setLanguage(values.language);
						usuario.setAvatar(values.avatar);
						usuario.setToken(currentUser.token);

						updateCurrentUser(usuario);

						setSubmitting(false);

						setIsLoading(false);

						showNotification(true);

					}
				);
			}}
		>

			{({ isSubmitting }) => (
				<EditProfile isSubmitting={isSubmitting} />
			)}

		</Formik>


	)

}