import { useAuthContext } from '../../hooks/useAuthContext'

export default function WelcomeMessage() {

	const {currentUser} = useAuthContext();

	return (
		<div className='border-l-2 w-full bg-white h-screen flex flex-col items-center justify-star'>
			<img className='w-3/4' src='/img/full-inbox.jpg' alt='empty-inbox' />
			<div className='text-3xl botton-0 font-black'>Hola {currentUser.name}!,</div>
			<div className='text-2xl botton-0'>Tienes documentos pendientes de firma</div>
			<div className='text-2xl botton-0'>Selecciona alguna para empezar.</div>
		</div>
	)
}