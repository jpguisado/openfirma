import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserList } from '../../services/user.services/getUserList';
import LoadingBar from '../LoadingBar/Index'
import { Link } from 'react-router-dom';
import { Card } from '../Card/Index';
import { useStats } from '../../hooks/useStats';

export function UserList(props) {

	const [isLoading, setIsLoading] = useState(false);
	const [registeredUsersList, setRegisteredUserList] = useState([]);

	const {activeUsersCount} = useStats();

	const { currentUser } = useAuth();

	useEffect(() => {
		setIsLoading(true);
		getUserList(currentUser.token)
		.then((resp) => {
			setRegisteredUserList(resp);
			setIsLoading(false);
		});
	}, [currentUser.token])

	return (

		<div className='w-full relative'>

			{isLoading ? <LoadingBar position={'absolute top-0'} bgColor={'bg-red-500'} /> : ''}

			<div className='p-5'>

				<div className='mb-10 flex'>
				<Card
						tipoDato={'Usuarios:'}
						img={'personas.png'}
						color={'bg-yellow-500'}
						dato={activeUsersCount}
						adjetivo={'activos'} 
					/>
					<Card
						tipoDato={'Cargos:'}
						img={'politician.png'}
						color={'bg-lime-500'}
						dato={activeUsersCount}
						adjetivo={'activos'} 
					/>
					<Card
						tipoDato={'Documentos:'}
						img={'documents.png'}
						color={'bg-blue-500'}
						dato={activeUsersCount}
						adjetivo={'activos'} 
					/>
					<Card
						tipoDato={'Doc. Firmados:'}
						img={'signedDocuments.png'}
						color={'bg-rose-500'}
						dato={activeUsersCount}
						adjetivo={'activos'} 
					/>
				</div>

				<div className='h-96 flex'>

					<div className='w-full rounded-md'>
						<input className='w-full my-5 bg-slate-50 border-[1px] border-gray-200' placeholder="Encuentra al usuario que buscas" type="text"></input>
						<div className='overflow-y-scroll h-96 relative'>
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
										registeredUsersList.map((user) => {
											return (
												<tr className='h-12 border-[1px] hover:bg-slate-100 select-none' key={user.id}>
													<td className=''><div className='h-8 w-8 bg-red-300 m-auto rounded-full' > <img src={`/img/${user.avatar}`} alt='' /> </div></td>
													<td>{user.username}</td>
													<td className='truncate'>{user.name}</td>
													<td><span className={` p-1 ${user.status === 'Alta' ? 'bg-lime-200' : 'bg-rose-200'}`}>{user.status}</span></td>
													<td className='cursor-pointer'><Link to={`${user.id}`}>Editar</Link></td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>

				</div>

			</div>

		</div>

	)
}