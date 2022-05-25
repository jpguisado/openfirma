import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react'

export function MenuItem(props) {
	return (
		<Link to={props.link}>
			<Menu.Item>
				{({ active }) =>
					<button className={`${active ? 'bg-blue-100 text-gray-900' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm rounded-sm h-12`}>
						{active ? <ActiveIcon icon={props.icon} className="mr-2 h-5 w-5" aria-hidden="true" /> : <InactiveIcon icon={props.icon} className="mr-2 h-5 w-5" aria-hidden="true" />}
						{props.tag}
					</button>}

			</Menu.Item>
		</Link>);
}

function InactiveIcon(props) {
	return (
		<svg
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d={props.icon}
				stroke="#475569"
				strokeLinecap="round"
				strokeWidth="2"
			/>
		</svg>
	)
}

function ActiveIcon(props) {
	return (
		<svg
			{...props}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d={props.icon}
				stroke="#475569"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	)
}