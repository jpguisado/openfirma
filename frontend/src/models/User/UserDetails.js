class UserDetails {

	constructor(UserDTO) {
		this.name = UserDTO.name;
		this.lastName1 = UserDTO.lastName1;
		this.lastName2 = UserDTO.lastName2;
		this.username = UserDTO.username;
		this.password = UserDTO.password;
		this.language = UserDTO.language;
	}
}

export default UserDetails;