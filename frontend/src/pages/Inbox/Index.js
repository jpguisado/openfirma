import { useEffect, useState } from 'react';
import Header from '../../components/Header/Index';
import MainSidebar from '../../components/Sidebar/Index'
import AppsSidebar from '../../components/AppsSidebar/Index'
import MessageList from '../../components/MessageList/Index';
import SigningRequestDetails from '../../components/SigningRequestDetails/Index';
import NewSigningRequest from '../../components/NewSigningRequest';
import EmptyList from '../../components/EmptyList/Index';
import WelcomeMessage from '../../components/WelcomeMessage/Index';
import { useAuth } from '../../hooks/useAuth';
import { getSigningRequestCountByAddresseeService } from '../../services/signingRequest.services/getSigningRequestCountByAddressee';

export default function OpenFirma() {

	const {currentUser} = useAuth();

	const [toggle, setToggle] = useState(true);

	const [selectedSigningRequestId, setSelectedSigningRequestId] = useState('');

	const [newSignRequestToggle, setNewSignRequest] = useState(false);

	const [pendingMessagesCount, setPendingMessagesCount] = useState(0);

	const [suggestionListState, setSuggestionList] = useState(false);


	useEffect(() => {
		getSigningRequestCountByAddresseeService(currentUser.id, currentUser.token).then(count => {
			setPendingMessagesCount(count);
		})
	},[pendingMessagesCount, currentUser.id, currentUser.token]);

	/**
	 * Activa o desactiva otras apps
	 * @param {*} e 
	 */
	const activateToggle = (e) => {
		e.preventDefault();
		setToggle(!toggle);
	}

	/**
	 * Activa el panel de nueva firma
	 * @param {*} e 
	 */
	const newSigningRequestToggle = (e) => {
		e.preventDefault();
		if(e.target.id === 'new-request' && newSignRequestToggle === false) {
			setNewSignRequest(!newSignRequestToggle);
		}
		else if(e.target.id === 'cancel-request') {
			setNewSignRequest(!newSignRequestToggle);
		}
	}

	/**
	 * Recibe la id de la petición seleccionada y actualiza el estado
	 * @param {*} id 
	 */
	const selectSigningRequestFunction = (itemId) => {
		setSelectedSigningRequestId(itemId);
	}

	/**
	 * Activa o desactiva la lista de contactos sugeridos
	 * @param {*} e 
	 */
	const toggleSuggestionList = (e) => {

		setSuggestionList(true);

		if(e.type === 'click' && e.target.id !== 'selectField') {
			setSuggestionList(false);
		}
	}

	return (
		<div className='bg-gray-50 overflow-hidden h-screen'>

			<Header activateSidebar={activateToggle} />

			<div onClick={toggleSuggestionList} className="overflow-hidden flex z-0 h-full">

				{/* Muestra u oculta la barra lateral */}
				{toggle ? <MainSidebar pendingMessagesCount={pendingMessagesCount} newSignRequestToggle={newSigningRequestToggle} /> : <AppsSidebar />}

				{/* Lista de mensajes */}
				<MessageList selectSigningRequestFunction={selectSigningRequestFunction} selectedSigningRequestId={selectedSigningRequestId}/>

				{/* Primera condición: si pendingMessagesCount > 0, evalúa la segunda condición, en caso contrario muestra "EmptyList"
					Segunda condición: si signingRequestId contiene algo, muestra el detalle. En caso contrario, muestra el "CallToAction"  */}
				{
				
				newSignRequestToggle ? <NewSigningRequest 
											newSigningRequestToggle={newSigningRequestToggle}
											toggleSuggestionList={toggleSuggestionList}
											suggestionListState={suggestionListState
											}/> : (

				pendingMessagesCount > 0 ?
						selectedSigningRequestId !== '' ? <SigningRequestDetails selectedSigningRequestId={selectedSigningRequestId} selectSigningRequestFunction={selectSigningRequestFunction}/> 
						: 
						<WelcomeMessage name={currentUser.name}/> 
					: <EmptyList name={currentUser.name}/>  )
				}

			</div>

		</div>
	)

}