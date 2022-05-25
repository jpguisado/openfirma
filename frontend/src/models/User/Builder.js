export default class User {

	constructor(name){
		this.name = name;
	}

	setId(id) {
		return this.id = id;
	}

	setLastName1(lastName1){
		return this.lastName1 = lastName1;
	}

	setLastName2(lastName2){
		return this.lastName2 = lastName2;
	}

	setName(name){
		return this.name = name;
	}

	setFullName(fullName) {
		return this.fullName = fullName;
	}

	setLanguage(language){
		return this.language = language;
	}

	setNif(nif){
		return this.nif = nif;
	}

	setUsername(username){
		return this.username = username;
	}

	setAvatar(avatar){
		return this.avatar = avatar;
	}

	setPositions(position){
		const positions = [];
		return this.positions = positions.push(position);
	}

	setRoles(rol){
		const roles = []
		return this.roles = roles.push(rol);
	}

	setToken(token){
		return this.token = token;
	}

	setUserStatus(status){
		return this.status = status;
	}

	setPassword(password){
		return this.password = password;
	}

	build() {
		return {
			id: 			this.id,
			name: 			this.name,
			lastName1: 		this.lastName1,
			lastName2: 		this.lastName2,
			nameLastName: 	this.nameLastName,
			language: 		this.language,
			nif: 			this.nif,
			username: 		this.username,
			avatar: 		this.avatar,
			positions: 		this.positions,
			roles: 			this.roles,
			token: 			this.token,
			password:		this.password

		}
	}

}