export const validateCreatePositionForm = values => {

	const errors = {};

	denomination(values, errors);
	typeOfPosition(values, errors);

	return errors;
}

const denomination = (values,errors) => {
	if (!values.denomination) { errors.denomination = 'Campo requerido'; }
}

const typeOfPosition = (values,errors) => {
	if (!values.typeOfPosition) { errors.typeOfPosition = 'Campo requerido'; }
}