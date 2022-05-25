class User {

	constructor(UserDTO) {
		this.id = UserDTO.id;
		this.name = UserDTO.name;
		this.fullName = UserDTO.fullName;
		this.username = UserDTO.username;
		this.avatar = UserDTO.avatar;
		this.positions = UserDTO.positions;
		this.roles = UserDTO.roles;
		this.token = UserDTO.token
	}

	toDTO() {

	}

}

export default User;