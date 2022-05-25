export default function EmptyList(){
	return(
		<div className='border-l-2 bg-white w-full h-screen flex flex-col items-center justify-star'>
			<img className='w-3/4' src='/img/empty-inbox.jpg' alt='empty-inbox'/>
			<div className='text-3xl botton-0 font-black'>Nada pendiente</div>
			<div className='text-2xl botton-0'>Recoge tus cosas y disfruta del campo.</div>
		</div>
	)
}