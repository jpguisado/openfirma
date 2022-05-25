import { validateLoginForm } from '../../hooks/validateUserForm';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useAuth } from '../../hooks/useAuth';

export function LoginForm() {

	const { hasLoginError, login } = useAuth();
	
	const initialValues = {
		username: '',
		password: ''
	}

	return (

		<Formik
			initialValues={initialValues}
			validate={validateLoginForm}
			onSubmit={(values, { setSubmitting, resetForm }) => {

				login(values.username, values.password);

				setSubmitting(false)

			}}
		>

			{({ isSubmitting }) => (

				<Form autoComplete='off' className='text-slate-700 text-sm  justify-center'>

					<div className='flex flex-col items-center'>
						<label htmlFor={'username'} className='w-full h-8'>Usuario:</label>
						<Field className='text-sm w-full rounded-sm border-0 border-b-[1px] ring-0 border-slate-500 focus:ring-0' type={'text'} name={'username'} placeholder={'Indica tu usuario'} />
						<div className='w-full h-6 m-auto'>
							<ErrorMessage className='text-left text-xs text-rose-500' name={'username'} component="div" />
						</div>
					</div>

					<div className='flex flex-col items-center'>
						<label htmlFor={'password'} className='w-full h-8'>Contraseña:</label>
						<Field className='text-sm w-full rounded-sm border-0 border-b-[1px] ring-0 border-slate-500 focus:ring-0' type={'password'} name={'password'} placeholder={'Indica tu contraseña'} />
						<div className='w-full h-6 m-auto'>
							<ErrorMessage className='text-left text-xs text-rose-500' name={'password'} component="div" />
						</div>
					</div>

					<button type='submit' disabled={isSubmitting} name={'/submit/i'} className='bg-blue-600 text-white p-3 rounded-sm active:bg-blue-700 active:scale-95 cursor-pointer transition-all duration-50'>Iniciar sesión</button>

					{hasLoginError ? <div className='text-rose-500 text-xs mt-5'>Usuario o contraseña incorrectos.</div> : ''}

				</Form>

			)}

		</Formik>

	)

}