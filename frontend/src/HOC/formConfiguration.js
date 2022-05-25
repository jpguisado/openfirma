/**
 * 
 * @param {*} initialValues Valores iniciales del formulario
 * @param {*} validation Función contra la que validar
 * @param {*} service Servicio de almacenamiento de los datos
 * @param {*} form Formulario
 * @returns 
 */
export function formConfiguration(initialValues, validation, form) {

	const initializeValues = () => {
		return initialValues;
	}

	const validateValues = () => {
		return validation;
	}

	const selectedForm = (isSubmitting) => {
		return form(isSubmitting);
	}

	return {

		initializeValues: initializeValues,
		validateValues: validateValues,
		selectedForm: selectedForm

	};

};