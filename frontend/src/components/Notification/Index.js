import React, {Fragment, useContext} from "react";
import { Transition } from '@headlessui/react';

import AuthContext from '../../context/AuthContext';

export function Notification(props) {

	const { notification, showNotification } = useContext(AuthContext);

	const automaticClosePopup = () => {
		setTimeout( () => showNotification(false), 5000)
	}

	return (

		<Transition afterEnter={automaticClosePopup} appear show={notification} as={Fragment} enter="ease-out duration-200 w-fit" enterFrom="opacity-0 scale-10" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-100">
			<div className='bg-gray-700 h-12 w-fit absolute bottom-10 left-10 rounded-sm text-white flex z-10'>
				<div className='flex m-auto text-sm text-left w-fit p-3'>{props.mensaje}</div>
				<div className='flex m-auto text-sm text-left p-3 w-10 cursor-pointer' onClick={() => showNotification((notification) => !notification)}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
			</div>

		</Transition>);
}
