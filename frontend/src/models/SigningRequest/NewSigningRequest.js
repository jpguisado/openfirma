class NewSigningRequest {

	constructor(requestDto) {
		this.senderId = requestDto.senderId;
		this.addreessee = requestDto.addreessee
		this.message = requestDto.message || null;
	}
}

export default NewSigningRequest;