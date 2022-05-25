import MessageList from '../../components/MessageList/Index';

import { useState, useEffect } from 'react';

import { Outlet, useOutletContext } from "react-router-dom";

import { useAuth } from '../../hooks/useAuth';

import { getSigningRequestListSent } from '../../services/signingRequest.services/getSigningRequestSent'

export default function Outbox(props) {
	
	const { currentUser } = useAuth();

	const [selectedSigningRequestId, setSelectedSigningRequestId] = useState('');

	const {suggestionListState, setSuggestionList} = useOutletContext();

	const [sentList, setSentList] = useState([]);

	useEffect(() => {
		getSigningRequestListSent(currentUser.id, currentUser.token)
		.then((resp) =>{
			setSentList(resp);
		})
	},[currentUser.id, currentUser.token])

	/**
	 * Recibe la id de la petición seleccionada y actualiza el estado
	 * @param {*} id 
	 */
	 const selectSigningRequestFunction = (itemId) => {
		setSelectedSigningRequestId(itemId);
	}

	return (
		<>

			<MessageList list={sentList} selectSigningRequestFunction={selectSigningRequestFunction} selectedSigningRequestId={selectedSigningRequestId} />

			<Outlet context={{ suggestionListState, setSuggestionList }} />

		</>
	)

}