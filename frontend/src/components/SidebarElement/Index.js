import { NavLink } from 'react-router-dom';

export function SidebarElement(props) {

	const activeClass = 'h-12 transition duration-200 ease-in-out hover:bg-blue-100 flex items-center cursor-pointer bg-slate-300';
	const inactiveClass = 'h-12 transition duration-200 ease-in-out hover:bg-blue-100 flex items-center cursor-pointer'

	return (

		<NavLink to={props.link} className={({ isActive }) => isActive ? activeClass : inactiveClass}>

			<div className="w-12 flex">

				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d={props.icon} />
				</svg>
			</div>
			<div className="w-36 text-left">{props.tag}</div>

			<div className="w-16">{props.count}</div>

		</NavLink>

	)
}