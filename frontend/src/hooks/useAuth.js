import { useCallback, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { loginService } from '../services/user.services/loginService';
import User from '../models/Users'
import { useNavigate } from 'react-router-dom';

export function useAuth() {

	const { currentUser, setCurrentUser } = useContext(AuthContext);

	const [loginState, setLoginState] = useState({ loading: false, error: false });

	let navigate = useNavigate();

	const login = useCallback(( username , password ) => {

		setLoginState({ loading: true, error: false })

		loginService(username, password)

			.then(resp => {

				// Recuperado el jwt, 
				// Comprobamos si es distinto a null
				if (resp) {
					// Almacenamos en sessionStorage un objeto user
					const logged = new User(resp);

					// Actualizamos state
					setLoginState({ loading: false, error: false })

					// Seteamos el usuario
					setCurrentUser(logged);

					// Almacenamos el usuario en la sesión
					window.sessionStorage.setItem('user', JSON.stringify(logged));

					// Enviamos al usuario a la pantalla inicial
					navigate("/firmas/inbox", { replace: true })

				}

			}).catch(error => {
				setCurrentUser(null)
				setLoginState({ loading: false, error: true })
				console.error('Se ha producido un error en loginService ' + error);
			});

	}, [setCurrentUser, navigate])

	const logout = useCallback(() => {

		window.sessionStorage.removeItem('user');

		setCurrentUser(null);

		navigate("/login")

	}, [setCurrentUser, navigate])


	// El Hook va a retornar
	return {

		// Si está cargando el login
		isLoginLoading: loginState.loading,

		// Si el login tiene algún error
		hasLoginError: loginState.error,

		//LoggedUser
		currentUser,

		// La función necesaria para logear al usuario
		login,

		// Función necesaria para deslogear al usuario
		logout

	}

}