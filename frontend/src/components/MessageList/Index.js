import MessageItem from '../MessageItem/Index';

export default function MessageList(props) {
	
	return (
		<div className="bg-gray-50 flex-shrink-0 w-96">
			<div className="h-16 text flex items-center font-semibold p-2">

				<div className="w-1/12 text-center self-center text-xl">
					<input type="checkbox" id="select-all" className="rounded text-red-600" name="select-all" value="true" />
				</div>
				<div className="w-11/12 text-gray-700">Elementos recibidos</div>

			</div>

			{/* <!-- Message list --> */}
			<div className="h-screen overflow-y-auto">

				{props.list.map((element) => {

					return (
						<MessageItem
							key={element.id}
							id={element.id}
							remitente={element.senderFullName}
							fichero={element.documents.documentName}
							mensaje={element.message}
							fEnvio={element.requestDate}
							selectedSigningRequestId={props.selectedSigningRequestId}
							selectSigningRequestFunction={props.selectSigningRequestFunction} />
					);

				})}



			</div>

		</div>
	)

}