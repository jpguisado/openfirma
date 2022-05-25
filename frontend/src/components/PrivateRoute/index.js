import { useLocation, Navigate } from 'react-router-dom';

export function PrivateRoute(props){

	let location = useLocation();
	
	if (!sessionStorage.getItem('user')) {
		return (
			<Navigate to="/login" state={{ from: location }} replace />
		)
	}

	return props.children;
	
}