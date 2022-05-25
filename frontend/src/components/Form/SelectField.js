import { Field, ErrorMessage } from 'formik';
export function SelectField(props) {

	return (

		<div className='flex flex-col items-center'>
			<label htmlFor='language' className='w-full h-8'>{props.etiqueta}</label>
			<Field className='text-sm w-full rounded-sm border-slate-300' as="select" name={props.name} placeholder={props.placeholder}>
				{props.children}
			</Field>
			<div className='w-full h-6 m-auto'>
				<ErrorMessage className='text-left text-xs text-rose-500' name={props.name} component="div" />
			</div>
		</div>

	)

}