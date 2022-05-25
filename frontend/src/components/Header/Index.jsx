import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MenuItem } from '../MenuItem/Index';
import { APPS } from '../../conf/apps'
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Header(props) {

	// Elementos del contexto que me hacen falta
	const { logout } = useAuth();

	const { currentUser } = useAuthContext();

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	}

	return (
		<header className="bg-gray-600 flex">
			<Menu>
				<Menu.Button className={' transition duration-200 ease-in-out hover:bg-gray-800'}>
					<div className="w-12 cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto hover:text-gray-600" fill="none" viewBox="0 0 24 24"
							stroke="white">
							<ellipse cx="2.5" cy="2.5" rx="2" ry="2" />
							<ellipse cx="12" cy="2.5" rx="2" ry="2" />
							<ellipse cx="21.5" cy="2.5" rx="2" ry="2" />
							<ellipse cx="2.5" cy="12" rx="2" ry="2" />
							<ellipse cx="12" cy="12" rx="2" ry="2" />
							<ellipse cx="21.5" cy="12" rx="2" ry="2" />
							<ellipse cx="2.5" cy="21.5" rx="2" ry="2" />
							<ellipse cx="12" cy="21.5" rx="2" ry="2" />
							<ellipse cx="21.5" cy="21.5" rx="2" ry="2" />
						</svg>

					</div>
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="z-10 absolute top-14 left-2 w-64 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1 ">
							{APPS.map((app) => {
								return (
									<MenuItem
										key={app.link}
										link={app.link}
										tag={app.tag}
										icon={app.icon}
									/>
								)
							})}

						</div>
						<div className="px-1 py-1">
							<MenuItem
								link={'/admin/users'}
								tag={'Administrador'}
								icon={'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'}
							/>
						</div>
						<div className="px-1 py-1">
							<MenuItem
								link={''}
								tag={'Ayuda'}
								icon={'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'}
							/>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>

			<div className="w-52 text-center self-center text-white text-sm antialiased font-medium cursor-pointer">IES Aguadulce - Almería</div>

			<div className="w-96 flex justify-center p-2 h-12">

				<div className="relative">
					<svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer absolute inset-1 h-6 w-6 text-gray-600 hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>

				</div>

				<input className="w-full pl-10" type="text" placeholder="Encuentra cualquier cosa" />
			</div>

			<div className="flex flex-grow justify-end bg-gray-600 text-gray-50">

				<div className="flex flex-grow justify-end bg-gray-600 text-gray-50">

					{/* User details */}
					<Link to='profile'>
						<button className="h-full w-14 transition duration-500 ease-in-out hover:bg-gray-800 cursor-pointer flex">
							<img className="rounded-full h-10 w-10 border-2 m-auto border-green-500" src={`${currentUser.avatar}`} alt={''} />
						</button>
					</Link>

					{/* Log out */}
					<Link to='logout'>
						<button onClick={handleLogout} className="w-14 h-full transition duration-500 ease-in-out hover:bg-gray-800 cursor-pointer">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-auto hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
						</button>
					</Link>
				</div>

			</div>

		</header>
	)

}