export function Tag(props) {

    function deleteUser(e) {
		e.preventDefault();
        props.deleteDestinatariesFromList(e.target.id);
    }

    return (

        <div className="mx-[1px] my-[1px] shrink-0 h-8 text-xs pl-3 rounded-full w-fit bg-gray-200 flex self-center select-none">
            {console.log(props)}
			<div className="my-auto pointer-events-none">{props.fullName}</div>
            <button id={props.id} onClick={deleteUser} className="h-8 w-8 rounded-full hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 m-auto pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

    );

}