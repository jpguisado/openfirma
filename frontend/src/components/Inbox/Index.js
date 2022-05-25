import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from "react-router-dom";
import MessageList from '../MessageList/Index';
import { getSigningRequestListByAddressee } from '../../services/signingRequest.services/getSigningRequestListByAddressee'
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Inbox(props) {

	const [suggestionListState, turnOffSuggestionList] = useOutletContext();

	const [selectedSigningRequestId, setSelectedSigningRequestId] = useState('');

	const { currentUser } = useAuthContext()

	const [receivedList, setReceivedList] = useState([]);

	useEffect(() => {
		if(currentUser){
			getSigningRequestListByAddressee(currentUser.id, currentUser.token)
			.then((resp) =>{
				if(resp){
					setReceivedList(resp);
				} else{
					throw new Error('Hay algún error en la consulta de peticiones pendientes')
				}
			})
			.catch( (error) => {
				console.log('Error en la consulta ' + error )
			})
		}
	},[currentUser])

	/**
	 * Recibe la id de la petición seleccionada y actualiza el estado
	 * @param {*} id 
	 */
	const selectSigningRequestFunction = (itemId) => {
		setSelectedSigningRequestId(itemId);
	}

	return (
		<>

			<MessageList
				list={receivedList}
				selectSigningRequestFunction={selectSigningRequestFunction}
				selectedSigningRequestId={selectedSigningRequestId}
			/>

			<Outlet
				context={[suggestionListState, turnOffSuggestionList]}
			/>

		</>
	)
} 