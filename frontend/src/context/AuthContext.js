import React, { useEffect, useState } from 'react';

// Podemos pasar a createContext un valor inicial.
// Como vamos a almacenar el usuario, lo dejaremos en null
const AuthContext = React.createContext({});

export function AuthContextProvider({ children }) {

	const [isLoading, setIsLoading] = useState(false);

	const [notification, showNotification] = useState(false);

	const [currentUser, setCurrentUser] = useState(
		() => JSON.parse(window.sessionStorage.getItem('user'))
	)

	const setValue = (value) => {

		try {

			if (value === null) {
				window.sessionStorage.removeItem('user');
			} else {
				window.sessionStorage.setItem('user', JSON.stringify(value));
				setCurrentUser(value);
			}

		} catch (error) {
			console.error('Error en el almacenamiento del usuario en LocalStorage' + error)
		}
	}

	return <AuthContext.Provider value={{
		currentUser,
		setCurrentUser,
		setValue,
		isLoading,
		setIsLoading,
		notification,
		showNotification
	}}>
		{children}
	</AuthContext.Provider>

}

export default AuthContext;