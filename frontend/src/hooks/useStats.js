import { useState, useEffect } from 'react';
import { countUsersByStatus } from '../services/user.services/countUserByStatus';
import { useAuth } from './useAuth';
export function useStats(){

	const { currentUser } = useAuth();
	const [activeUsersCount, setActiveUsersCount] = useState([]);

	useEffect( ()=> {
		countUsersByStatus(currentUser.token)
		.then((resp)=>{
			setActiveUsersCount(resp);
		})

	},[currentUser]);
	
	return {
		activeUsersCount
	}

}