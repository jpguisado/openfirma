import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getPositions } from '../../services/positions/getPositions';

import LoadingBar from '../LoadingBar/Index'
import AuthContext from '../../context/AuthContext';


export function FilterablePositionsTable(props) {

	const { setIsLoading, currentUser, isLoading, notification } = useContext(AuthContext);

	const [ filteredList, setFilteredList ] = useState([]);

	const [ userList, setUserList ] = useState([]);

	function filterList(e) {
		setFilteredList(() => {
			return Array.from(userList.filter(function (el) {
				return el.fullName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
			}));
		}
		);
	}

	useEffect(() => {
		setIsLoading(true);
		getPositions(currentUser.token)
			.then((resp) => {
				if (resp) {
					setUserList(resp);
				}
				setIsLoading(false);
			})
	}, [currentUser, setIsLoading, notification])

	useEffect(() => {
		setFilteredList(userList);
	}, [userList])

	return (<div className='w-full rounded-md'>
		<input onChange={filterList} className='w-full my-5 bg-slate-50 border-[1px] border-gray-200' placeholder="Encuentra al usuario que buscas" type="text"></input>
		<div className='overflow-y-scroll h-96 relative'>
			{}
			{isLoading ? <LoadingBar position={'absolute top-0'} bgColor={'bg-red-500'} /> : ''}
			<table className="table-fixed w-full text-left text-md border-[1px]">
				<thead className='h-12 bg-slate-100 text-md rounded-3xl'>
					<tr className='rounded-3xl'>
						<th className=''>Denominación del cargo</th>
					</tr>
				</thead>
				<tbody className='font-light'>
					{
						filteredList.map(user => {
							return (
							<tr className='h-12 border-[1px] hover:bg-slate-100 select-none' key={user.id}>
								<td className='text-center'>{user.denomination}</td>
							</tr>)
						})
					}
				</tbody>
			</table>
		</div>
	</div>);
}