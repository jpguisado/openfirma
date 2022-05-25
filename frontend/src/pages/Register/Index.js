import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = data => console.log(data);
	console.log(errors);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="Nombre" {...register("Nombre", { required: true, max: 97, min: 3, maxLength: 80 })} />
			<input type="text" placeholder="Primer apellido" {...register("Primer apellido", { required: true, min: 1, maxLength: 100 })} />
			<input type="text" placeholder="Segundo apellido" {...register("Segundo apellido", {})} />
			<input type="text" placeholder="Nombre de usuario" {...register("Nombre de usuario", {})} />
			<select {...register("Lengua", { required: true })}>
				<option value="Castellano">Castellano</option>
				<option value=" Catalán"> Catalán</option>
			</select>
			<input type="url" placeholder="Avatar" {...register("Avatar", {})} />
			<select {...register("Cargos")}>
				<option value="Auxiliar Administrativo">Auxiliar Administrativo</option>
			</select>
			<select {...register("Permisos")}>
				<option value="USER">USER</option>
				<option value=" ADMIN"> ADMIN</option>
			</select>

			<input type="submit" />
		</form>
	);
}