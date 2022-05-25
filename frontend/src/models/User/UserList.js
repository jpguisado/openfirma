class UserList {

	constructor(UserDTO) {
		this.id = UserDTO.id;
		this.name = UserDTO.fullName;
		this.username = UserDTO.username;
		this.status = UserDTO.status;
	}
}

export default UserList;