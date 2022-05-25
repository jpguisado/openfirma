class SigningRequest {

	constructor(requestDto) {
		this.id = requestDto.id;
		this.senderFullName = requestDto.senderFullName;
		this.senderAvatar = requestDto.senderAvatar;
		this.senderPosition = requestDto.senderPosition;
		this.documentsName = requestDto.documentName;
		this.documentURI = requestDto.documentURI
		this.requestDate = requestDto.requestDate;
		this.message = requestDto.message || null;
	}

}

export default SigningRequest;