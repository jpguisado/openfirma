import { Form, Field } from 'formik';
import { TextField } from '../Form/TextField';
import { SelectField } from '../Form/SelectField';
import { Option } from '../Form/Option';
import { InputField } from '../Form/InputField';
import CustomButton from '../CustomButton/Index';

export function EditProfile(props) {

	return (

		<Form autoComplete='off' className='grid grid-cols-2 gap-1 text-slate-700 text-sm'>

			<TextField
				etiqueta={'Nombre:'}
				name={'name'}
				placeholder={'Indica tu nombre'}
			/>

			<TextField
				etiqueta={'Primer apellido:'}
				name={'lastName1'}
				placeholder={'Indica tu primer apellido'}
			/>

			<TextField
				etiqueta={'Segundo apellido:'}
				name={'lastName2'}
				placeholder={'Indica tu segundo apellido'}
			/>

			<TextField
				etiqueta={'Documento de identidad:'}
				name={'nif'}
				placeholder={'Indica tu documento de identidad'}
			/>

			<SelectField
				etiqueta={'Idioma:'}
				placeholder={'Selecciona el idioma del usuario'}
				name={'language'}
			>
				<Option id={1} key={'Castellano'} value={'Castellano'} etiqueta={'Castellano'} />
				<Option id={2} key={'Catalán'} value={'Catalán'} etiqueta={'Catalán'} />
				<Option id={3} key={'Euskera'} value={'Euskera'} etiqueta={'Euskera'} />
				<Option id={4} key={'Gallego'} value={'Gallego'} etiqueta={'Gallego'} />
				
			</SelectField>

			<InputField
				etiqueta={'Avatar'}
				buttonTag={'Seleccionar foto'}
				name={'avatar'}
			/>

			{props.children}

			<div className='flex h-fit col-start-1'>
				<CustomButton
					id={'1'}
					COLOR={'border-[1px] border-sky-500'}
					HOVER={'hover:bg-sky-600'}
					tag={'Guardar'}
					type={'submit'}
					disabled={props.isSubmitting}
				/>

				<CustomButton
					id={'2'}
					COLOR={'border-[1px] border-sky-500'}
					HOVER={'hover:bg-sky-600'}
					tag={'Limpiar'}
					type={'reset'}
				/>

			</div>

			<Field type='text' hidden name='id' />

		</Form>

	)

}