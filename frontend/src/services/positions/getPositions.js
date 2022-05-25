import { get } from '../base/get';
import Position from '../../models/Position/Position';

/**
 * Retorna array de objetos 'usuario' dados de alta en el sistema
 * @param {*} page Página a consultar
 * @param {*} size Tamaño de la página a consultar
 * @returns Array de objetos tipo User
 */
export const getPositions = (userToken) => {

	const endpoint = 'positions';

	const authHeader = { headers: { 'Authorization': userToken } }

	const params = {
		size: 200,
		projection: 'positionInfo',
	};

	return get(endpoint, params, authHeader).then(res => {

		const { positions } = res._embedded;

		return positions.map(position => {
			const cargo = new Position();
			cargo.setDenomination(position.denomination);
			cargo.setId(position.id);
			cargo.build();
			return cargo;
		});

	})
}