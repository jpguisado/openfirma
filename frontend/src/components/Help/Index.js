export function Help() {


	return (
		<div className='w-full h-screen flex justify-center'>

			<div className='bg-gray-100 w-3/5 p-10 overflow-y-scroll'>

				<h1 className='text-3xl pl-14'>Ayuda en línea</h1>

				<article className='pl-14 pt-10'>
					<div className='text-2xl'>Crear una nueva petición de firma</div>
					<div className='mt-3'>

						<p className='mt-1'>Crear una nueva petición de firma es muy sencillo. Una vez que has iniciado sesión, pulsa en el botón "Nueva firma"
							que encontrarás en el panel de Firmas.
						</p>

						<p className='mt-1'>En la nueva pantalla, completa los campos básicos (destinatario, mensaje) y selecciona el fichero que quieres enviar a firma.</p>

						<p className='mt-1'>Cuando lo hayas revisado, pulsa Enviar!</p>


					</div>
				</article>

				<article className='pl-14 pt-10'>
					<div className='text-2xl'>Firma de documentos!</div>
					<div className='mt-3'>

						<p className='mt-1'>Para firmar un documento, abre la bandeja de entradas y selecciona una petición. Cuando la tengas marcada, podrás visualizar el documento o pulsar
						directamente en Firmar
						</p>

						<p className='mt-1'>Para realizar la firma del documento necesitas tener instalado autofirma</p>

						<p className='mt-1'>ATENCIÓN! Al tratarse de una versión de desarrollo, y no disponer de certificado SSL desplegado, es necesario desmarcar la opción "Aceptar sólo conexiones con sitios seguros", dentro del panel de configuración de Autofirma.</p>

					</div>
				</article>

				<article className='pl-14 pt-10'>
					<div className='text-2xl'>Revisar documentos enviados a la firma</div>
					<div className='mt-3'>

						<p className='mt-1'>Una vez abierto el panel de firmas, pincha en el apartado "Bandeja de salida".
						</p>

						<p className='mt-1'>Podrás ver el mensaje y el archivo adjunto enviado.</p>

					</div>
				</article>

				<article className='pl-14 pt-10'>
					<div className='text-2xl'>Crear un nuevo usuario</div>
					<div className='mt-3'>Pincha en el menú, clicando arriba a la izquierda.</div>
					<div className='mt-3'>Pincha en administrador y desde ahí en gestión de usuarios.</div>
					<div className='mt-3'>Una vez que hayas abierto la nueva pantalla, pincha en Crear usuario.</div>
					<div className='mt-3'>Completa todos los campos y pulsa guardar.</div>
				</article>

				<article className='pl-14 pt-10'>
					<div className='text-2xl'>Editar datos del perfil del usuario</div>
					<div className='mt-3'>Pincha en la foto de perfil situada arriba a la derecha.</div>
					<div className='mt-3'>Se mostrarán tus datos de usuario.</div>
					<div className='mt-3'>Edita lo que necesites y pulsa guardar.</div>
				</article>

				<article className='pl-14 pt-10'>
				</article>

			</div>

		</div>
	)

}