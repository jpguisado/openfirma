import { Form } from 'formik';

import { useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { TextField } from '../Form/TextField';
import { InputField } from '../Form/InputField';
import { SelectField } from '../Form/SelectField';
import { Option } from '../Form/Option';
import { useContext } from 'react';
import CustomButton from '../CustomButton/Index';
import { getPositions } from '../../services/positions/getPositions';

export function EditUserByAdminForm(props) {

	const { currentUser } = useContext(AuthContext);

	const [positions, setPositions] = useState([]);

	useEffect(() => {
		getPositions(currentUser.token)
			.then((resp) => {
				setPositions(resp);
			})
	}, [currentUser])

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
				<Option id={''} value='' etiqueta='Selecciona una opción... ' />
				<Option id={'Castellano'} key={'Castellano'} value={'Castellano'} etiqueta={'Castellano'} />
				<Option id={'Catalán'} key={'Catalán'} value={'Catalán'} etiqueta={'Catalán'} />
				<Option id={'Euskera'} key={'Euskera'} value={'Euskera'} etiqueta={'Euskera'} />
				<Option id={'Gallego'} key={'Gallego'} value={'Gallego'} etiqueta={'Gallego'} />

			</SelectField>

			<TextField
				etiqueta={'Username:'}
				name={'username'}
				placeholder={'Nombre de usuario'}
			/>

			<TextField
				type={'password'}
				etiqueta={'Contraseña:'}
				name={'password'}
				placeholder={'Contraseña de usuario'}
			/>

			<SelectField
				etiqueta={'Cargos en la organización:'}
				placeholder={'Selecciona el cargo del usuario'}
				name={'positions[0]'}
			>
				<Option id={''} value='' etiqueta='Selecciona una opción... ' />
				{positions.map((element) => {
					return <Option key={element.id} id={element.id} value={element.id} etiqueta={element.denomination} />
				})}
			</SelectField>

			<SelectField
				etiqueta={'Perfil del usuario:'}
				placeholder={'Selecciona el perfil'}
				name={'roles[0]'}
			>
				<Option id={''} value='' etiqueta='Selecciona una opción... ' />
				<Option id={1} value={'ADMIN'} etiqueta={'Administrador'} />
				<Option id={2} value={'USER'} etiqueta={'Usuario lectura-escritura'} />
				<Option id={3} value={'USER'} etiqueta={'Usuario solo lectura'} />
			</SelectField>

			<SelectField
				etiqueta={'Estado:'}
				placeholder={'Selecciona el estado del usuario'}
				name={'status'}
			>
				<Option id={''} value='' etiqueta='Selecciona una opción... ' />
				<Option id={'Alta'} key={'Alta'} value={'Alta'} etiqueta={'Alta'} />
				<Option id={'Baja'} key={'Baja'} value={'Baja'} etiqueta={'Baja'} />
				<Option id={'Bloqueado'} key={'Bloqueado'} value={'Bloqueado'} etiqueta={'Bloqueado'} />

			</SelectField>

			<InputField
				etiqueta={'Avatar'}
				buttonTag={'Seleccionar foto'}
				name={'avatar'}
			/>

			<div className='w-full h-6 m-auto col-span-2'>
				<div className='text-left text-xs text-rose-500'>{props.estado}</div>
			</div>

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
			
			<input type='text' readOnly className='invisible' value={props.editedUserId}/>

		</Form>

	)

}