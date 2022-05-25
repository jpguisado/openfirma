class SigningRequest {

	constructor(requestDto) {
		this.id = requestDto.id;
		this.senderFullName = requestDto.senderFullName;
		this.senderAvatar = requestDto.senderAvatar;
		this.senderPosition = requestDto.senderPosition;
		this.status = requestDto.status;
		this.documents = requestDto.documents;
		this.requestDate = requestDto.requestDate;
		this.message = requestDto.message || null;
	}

}

export default SigningRequest;