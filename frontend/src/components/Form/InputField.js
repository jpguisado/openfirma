import { useRef, useState } from 'react';
import CustomButton from '../CustomButton/Index';
import { ErrorMessage, useFormikContext } from 'formik';
import { Close } from '../Close/Index'

export function InputField(props) {

	const fileInput = useRef();

	const formikProps = useFormikContext();

	const [cleanable, setCleanable] = useState(false);

	/**
	 * Activate the file selector of the OS.
	 * @param {event} event 
	 */
	const handleFileInput = (e) => {
		e.preventDefault();
		if (e.target.id === 'uploader') {
			fileInput.current.click();
		}
	}

	const handleChange = (e) => {
		e.preventDefault();
		formikProps.setFieldValue("file", e.currentTarget.files[0]);
		setCleanable(true)
	}

	const cleanFileInput = (e) => {
		e.preventDefault();
		setCleanable(false)
		fileInput.current.value = '';
		formikProps.setFieldValue("file", '');
	}
	
	return (

		<>
		
			<div className='flex flex-col items-start'>
				<label htmlFor={props.name} className='w-full h-6'>{props.etiqueta}</label>
				<div onClick={handleFileInput} className='flex items-start'>
					<CustomButton
						id='uploader'
						COLOR={'border-[1px] border-sky-500'}
						HOVER={'hover:bg-sky-600'}
						tag={props.buttonTag}
					/>
					{cleanable ? <Close cleanFileInput={cleanFileInput} /> : ''}
				</div>

				<div className='w-full h-6 m-auto'>
					<ErrorMessage className='text-left text-xs text-rose-500' name={props.name} component="div" />
				</div>

			</div>

			<input accept="image/*" className='h-1 w-1 invisible overflow-hidden' ref={fileInput} id="file" name={props.name} type="file" onChange={handleChange} />

  		</>

	)

}