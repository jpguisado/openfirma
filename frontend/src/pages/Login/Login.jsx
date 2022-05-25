
import LoadingBar from '../../components/LoadingBar/Index';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../components/LoginForm/Index'

export default function Login() {

	const { isLoginLoading } = useAuth();

	return (

		<>

			<div className='w-full flex h-screen'>

				{isLoginLoading ? <LoadingBar position={'absolute top-0'} bgColor={'bg-red-500'} /> : ''}

				<div style={{ backgroundImage: "url(img/handwritten.png), linear-gradient(180deg, rgba(14,165,233,1) 0%, rgba(30,64,175,1) 100%)", backgroundPosition: "center", backgroundSize: "cover", backgroundColor: 'rgb(14,165,233)' }} className='w-1/2 flex'>
				</div>
				<div className='w-1/2 flex justify-center items-center'>

					<div className='w-3/5 h-3/5 flex flex-col'>

						<div className='text-center text-2xl'>Bienvenido a <strong>OpenFirma</strong></div>

						<div className='h-32'></div>

						<LoginForm />

					</div>

				</div>

			</div>

		</>

	)

} 