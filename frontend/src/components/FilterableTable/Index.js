import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUserList } from '../../services/user.services/getUserList';

import LoadingBar from '../LoadingBar/Index'
import AuthContext from '../../context/AuthContext';


export function FilterableTable(props) {

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
		getUserList(currentUser.token)
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
						<th className='w-16'></th>
						<th className='w-32'>Usuario</th>
						<th className='w-48'>Nombre Completo</th>
						<th className='w-24'>Estado</th>
						<th className='w-16'></th>
					</tr>
				</thead>
				<tbody className='font-light'>
					{
						filteredList.map(user => {
							return <tr className='h-12 border-[1px] hover:bg-slate-100 select-none' key={user.id}>
								<td className=''><div className='h-8 w-8 bg-red-300 m-auto rounded-full'> <img className='overflow-hidden rounded-full' src={`${user.avatar}`} alt='' /> </div></td>
								<td>{user.username}</td>
								<td className='truncate'>{user.fullName}</td>
								<td><span className={` p-1 ${user.status === 'Alta' ? 'bg-lime-200' : 'bg-rose-200'}`}>{user.status}</span></td>
								<td><Link to={user.id.toString()} className='cursor-pointer'>Editar</Link></td>
							</tr>;
						})
					}
				</tbody>
			</table>
		</div>
	</div>);
}