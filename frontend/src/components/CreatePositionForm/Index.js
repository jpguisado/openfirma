import { Field, Form, ErrorMessage } from 'formik';
import CustomButton from '../CustomButton/Index';

export default function CreatePositionForm(props) {

	return (

		<Form className='grid grid-cols-2 gap-1 text-slate-700 text-sm'>

			<div className='flex flex-col items-center'>
				<label htmlFor="denomination" className='w-full h-6'>Denominación del cargo:</label>
				<Field className='text-sm w-full rounded-sm border-slate-300' type="text" name="denomination" placeholder="Denominación del cargo" />
				<div className='w-full h-6 m-auto'>
					<ErrorMessage className='text-left text-xs text-rose-500' name="denomination" component="div" />
				</div>
			</div>

			<div className='flex flex-col items-center'>
				<label htmlFor="typeOfPosition" className='w-full h-6'>Tipo de cargo:</label>
				<Field className='text-sm w-full rounded-sm border-slate-300' type="text" name="typeOfPosition" placeholder="Tipo de cargo" />
				<div className='w-full h-6 m-auto'>
					<ErrorMessage className='text-left text-xs text-rose-500' name="typeOfPosition" component="div" />
				</div>
			</div>

			<div className='flex h-fit'>
				<CustomButton
					id={'1'}
					COLOR={'border-[1px] border-sky-500'}
					HOVER={'hover:bg-sky-600'}
					tag={'Guardar'}
					type={'submit'}
					disabled={props.isSubmitting}
				/>

			</div>

		</Form>

	)

}