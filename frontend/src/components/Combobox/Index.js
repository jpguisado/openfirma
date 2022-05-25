import { useEffect, useState } from 'react'
import { getUserService } from '../../services/user.services/getUserService';
import { useAuth } from '../../hooks/useAuth';
import { useOutletContext } from 'react-router-dom';

export default function ComboBox(props) {

	const [destinataries, setDestinataries] = useState([]);
	
	const [suggestionListState, turnOffSuggestionList] = useOutletContext();

	const [ filteredList, setFilteredList ] = useState([]);

	const { currentUser } = useAuth();

	useEffect(() => {
		getUserService(currentUser.token).then(
			users => {
				setDestinataries(users);
		});

	}, [currentUser.token])

	useEffect(() => {
		setFilteredList(destinataries);
	},[destinataries])

	function moveFocusWithKeys(e) {

		if (e.key === 'Enter') {
			e.target.click();

		} else if (e.key === 'ArrowDown') {

			if (e.target.nextSibling) {
				e.target.nextSibling.focus();
			}

		} else if (e.key === 'ArrowUp') {

			if (e.target.previousSibling) {
				e.target.previousSibling.focus();
			}
		}

	}

	function filterList(e) {
		setFilteredList(() => {
			return Array.from(destinataries.filter(function (el) {
				return el.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
			}));
		}
		);
	}

	function selectDestinatary(e) {
		console.log(e.target.id)
		turnOffSuggestionList(e);
		props.addDestinataryToList(destinataries[e.target.id]);
	}

	function activateSuggestionList(e){
		turnOffSuggestionList(e)
	}

	return (
		<div className='relative'>

			<input tabIndex="1" id='selectField' onChange={filterList} onFocus={activateSuggestionList} className='h-8 border-0 focus:ring-0 placeholder:text-xs focus:border-0 pl-2' type='text' placeholder='Selecciona destinatarios clicando aquí' />
			
			<hr className='my-2'/>

			{suggestionListState && (
				<div id='for' className="bg-white h-36 w-64 absolute left-2 overflow-x-auto drop-shadow-md z-10">
					<div className='text-xs h-6 text-gray-800 flex pl-2 my-auto bg-white'><span className='my-auto'>Contactos sugeridos:</span></div>

					{filteredList.map((element, i) => {
						return (
							<div key={element.id}  tabIndex="2" onKeyUp={moveFocusWithKeys} onClick={ (e) => selectDestinatary(e, this) } id={i} className="h-10 w-full flex hover:bg-gray-100 focus:bg-gray-100 cursor-pointer pl-2">
								<div className="pointer-events-none rounded-full h-8 w-8 my-auto bg-blue-100 mr-2">
									<img title="photo" className="text-center rounded-full border-2 h-8 w-8 border-gray-500" alt={''} src={`${element.avatar || 'default-avatar.jpg'}`}></img>
								</div>
								<span className="pointer-events-none my-auto text-sm">{element.name}</span>
							</div>
						)
					})}
				</div>
			)}
		</div>

	)
}
