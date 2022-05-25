import React, { useState, useEffect } from 'react';

import { Outlet, Link } from "react-router-dom";

import MainSidebar from '../components/Sidebar/Index';
import { SidebarElement } from '../components/SidebarElement/Index';
import { useAuthContext } from '../hooks/useAuthContext';
import { getSigningRequestCountByAddresseeService } from '../services/signingRequest.services/getSigningRequestCountByAddressee';
import { getSigningRequestCountBySender } from '../services/signingRequest.services/getSigningRequestCountBySender'

export function Firmas(props) {

	const [suggestionListState, setSuggestionList] = useState(false);

	const [receivedRequestCount, setReceivedRequestCount] = useState(0);
	
	const [sentRequestCount, setSentRequestCount] = useState(0);

	const { currentUser } = useAuthContext();

	const inboxIcon = 'M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20'
	const outboxIcon = 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'

	useEffect(function () {
		getSigningRequestCountByAddresseeService(currentUser.id, currentUser.token)
			.then(count => {
				setReceivedRequestCount(count);
			})
	}, [setReceivedRequestCount, currentUser])

	useEffect(function () {
		getSigningRequestCountBySender(currentUser.id, currentUser.token)
			.then(count => {
				setSentRequestCount(count);
			})
	}, [setSentRequestCount, currentUser])

	const turnOffSuggestionList = (e) => {
		if (e.target.id === 'selectField') {
			setSuggestionList(true);
		} else { setSuggestionList(false) }

	}

	return (

		<div onClick={turnOffSuggestionList} className="overflow-hidden flex z-0 h-full">

			<MainSidebar>
				{
					<>

						<Link to='inbox/new'><button id='new-request' onClick={props.newSignRequestToggle} className='bg-gray-600 w-28 mb-3 p-3 text-white transition-colors hover:bg-gray-700 rounded-sm'>Nueva firma</button></Link>

						<SidebarElement
							link='inbox'
							icon={inboxIcon}
							tag="Peticiones recibidas"
							count={receivedRequestCount}
						/>

						<SidebarElement
							link='outbox'
							icon={outboxIcon}
							tag="Peticiones enviadas"
							count={sentRequestCount}
						/>
					</>
				}
			</MainSidebar>

			<Outlet context={[suggestionListState, turnOffSuggestionList]} />

		</div>


	)

}