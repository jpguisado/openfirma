class SimpleUser {

	constructor(UserDTO) {
		this.id = UserDTO.id;
		this.name = UserDTO.name;
		this.avatar = UserDTO.avatar;
	}
}

export default SimpleUser;