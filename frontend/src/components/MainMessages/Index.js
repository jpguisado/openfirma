import { useEffect, useState } from 'react'
import WelcomeMessage from '../WelcomeMessage/Index';
import EmptyList from '../EmptyList/Index';
import { useAuthContext } from '../../hooks/useAuthContext';
import { getSigningRequestCountByAddresseeService } from '../../services/signingRequest.services/getSigningRequestCountByAddressee';

export function MainMessages() {

	const [pendingRequest, setPendingRequest] = useState();

	const { currentUser } = useAuthContext();

	useEffect(() => {

		getSigningRequestCountByAddresseeService(currentUser.id, currentUser.token)
			.then((response) => {
				if (response) {
					setPendingRequest(response);
				}
			})
	})


	return (

		<div className="overflow-hidden flex z-0 h-full flex-col items-center w-full">
			{pendingRequest > 0 ? <WelcomeMessage /> : <EmptyList />}
		</div>

	)

}