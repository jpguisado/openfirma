import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LoginForm } from '../../components/LoginForm/Index';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

test('Renderizado, validación y envío del formulario', async () => {

	const handleSubmit = jest.fn()

	const values = {
		'username':'josepino',
		'password':'001800180'
	}

	render(<LoginForm onSubmit={(values)} />)

	const user = userEvent;

	await user.type(screen.getByPlaceholderText(/usuario/i), 'josepino')
	await user.type(screen.getByPlaceholderText(/contraseña/i), '001800180')

	await user.click(screen.getByText('Iniciar sesión'))

	expect(handleSubmit).toHaveBeenLastCalledWith(
		values({'usuario':'josepino',
		'password':'001800180'}),
	)

})