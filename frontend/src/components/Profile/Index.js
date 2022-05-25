import { Notification } from './../Notification/Index';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { ProfileFormInvocation } from '../Form/ProfileFormInvocation/Index';
import LoadingBar from '../LoadingBar/Index'

export function Profile(props) {

	const { currentUser, isLoading } = useContext(AuthContext);

	return (

		<div className="overflow-hidden flex z-0 h-full">

			<Notification 
				mensaje={'Datos modificados correctamente.'}
			/>

			<div className='w-full overflow-y-auto flex justify-center relative'>

			{isLoading ? <LoadingBar position={'absolute top-0'} bgColor={'bg-red-500'} /> : ''}

				<div className='w-1/2'>

					<div className='flex justify-center mt-10'>

						<div className='rounded-full h-20 w-20 flex overflow-hidden'>
							<img className='' alt='user-avatar' src={`${currentUser.avatar}`}></img>
						</div>

					</div>

					<div className=' rounded-md p-5'>

						<h1 className='text-center text-3xl'>Hola {currentUser.name}</h1>
						<h2 className='my-5 text-xl text-center'>Estos son tus datos personales. <br/> Modifica lo que no sea correcto y pulsa guardar:</h2>

						<ProfileFormInvocation/>

					</div>

				</div>
			</div>

		</div>

	)
}