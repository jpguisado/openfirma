export default function MainSidebar(props) {

	return (

		<div id="action-wrapper" className="bg-gray-100 text-xs w-64 text-center filter drop-shadow-lg">

			<div className="px-4 my-5 text-sm p-3 text-black text-left cursor-default font-bold">Panel de firmas</div>

			{props.children}

		</div>
	)

}