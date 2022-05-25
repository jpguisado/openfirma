export function Close(props) {

	function close(e) {
		props.cleanFileInput(e);
	}

	return (
		<div id='close' onClick={ close } className='flex items-center h-full border-[1px] hover:bg-red-500 bg-lime-500 transition duration-200 cursor-pointer'>
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</div>
	);
}