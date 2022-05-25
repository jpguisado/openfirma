export const validateUpdateFormByAdmin = values => {

	const errors = {};

	name(values, errors);
	lastName1(values, errors);
	lastName2(values, errors);
	nif(values, errors);
	username(values, errors);

	return errors;
}

export const validateUpdateUserByUser = values => {

	const errors = {};

	name(values, errors);
	lastName1(values, errors);
	lastName2(values, errors);
	nif(values, errors);
	language(values, errors);
	avatar(values, errors);

	return errors;

}

export const validateCreateForm = values => {

	const errors = {};

	name(values, errors);
	lastName1(values, errors);
	nif(values, errors);
	username(values, errors);
	password(values, errors);
	language(values, errors);
	positions(values, errors);
	roles(values, errors);
	avatar(values, errors)

	return errors;
}

export const validateLoginForm = values => {

	const errors = {};

	username(values, errors);
	password(values, errors);

	return errors;
	
}

const username = (values,errors) => {
	if (!values.username) { errors.username = 'Campo requerido'; }
	else if (values.username.length < 3) { errors.username = 'El nombre de usuario debe tener al menos tres caracteres'; }
}

const name = (values,errors) => {
	if (!values.name) { errors.name = 'Campo requerido'; }
	else if (values.name.length < 3) { errors.name = 'El nombre debe tener al menos tres caracteres'; }
	else if (values.name.length >= 20) { errors.name = 'El nombre de usuario debe tener como máximo veinte caracteres'; }
}

const lastName1 = (values,errors) => {
	if (!values.lastName1) { errors.lastName1 = 'Campo requerido'; }
	else if (values.lastName1.length < 2) { errors.lastName1 = 'El apellido debe tener al menos dos caracteres'; }
	else if (values.lastName1.length >= 40) { errors.lastName1 = 'El apellido de usuario debe tener como máximo cuarenta caracteres'; }
}

const lastName2 = (values,errors) => {
	if (!values.lastName2) { errors.lastName2 = 'Campo requerido'; }
}

const nif = (values,errors) => {
	if (!values.nif) { errors.nif = 'Campo requerido'; }
}

const password = (values,errors) => {
	if (!values.password) { errors.password = 'Campo requerido'; }
	else if (values.password.length < 9) { errors.password = 'La contraseña debe tener al menos nueve caracteres'; }
}

const language = (values,errors) => {
	if (!values.language) { errors.language = 'Campo requerido'; }
}

const positions = (values,errors) => {
	if (!values.positions) { errors.positions = 'Campo requerido'; }
}

const roles = (values,errors) => {
	if (!values.roles) { errors.roles = 'Campo requerido'; }
}

const avatar = (values, errors) => {
	if (!values.file) { errors.avatar = 'Selecciona una foto de perfil'}
}