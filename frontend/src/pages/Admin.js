import MainSidebar from '../components/Sidebar/Index';
import { SidebarElement } from '../components/SidebarElement/Index';

import { Outlet } from "react-router-dom";

export function Admin(props) {

	const addUser = 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
	const userpositions = 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'

	return (

		<div className="overflow-hidden flex z-0 h-full">

			<MainSidebar>
			{
				<>

					<SidebarElement
						link='users'
						icon={addUser}
						tag="Gestión de usuarios"
						count=""
					/>

					<SidebarElement
						link='positions'
						icon={userpositions}
						tag="Cargos"
						count=""
					/>
				
				</>
			}
		</MainSidebar>

		<Outlet />

		</div>

	)

}