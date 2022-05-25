import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'

export function useAuthContext() {

	const {currentUser, setCurrentUser} = useContext(AuthContext);

	useEffect(() => {
		setCurrentUser(JSON.parse(window.sessionStorage.getItem('user')));
	},[])

	return {
		currentUser
	}

}