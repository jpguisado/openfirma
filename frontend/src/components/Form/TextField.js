import { Field, ErrorMessage } from 'formik';

export function TextField(props) {

	return (

		<div className='flex flex-col items-center'>
			<label htmlFor={props.name} className='w-full h-8'>{props.etiqueta}</label>
			<Field className='text-sm w-full rounded-sm border-slate-300' type={props.type || 'text' } name={props.name} placeholder={props.placeholder} />
			<div className='w-full h-6 m-auto'>
				<ErrorMessage className='text-left text-xs text-rose-500' name={props.name} component="div" />
			</div>
		</div>

	)

}