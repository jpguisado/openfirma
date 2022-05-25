export default class Position {

	construct(denomination) {
		this.denomination = denomination;
	}

	setId(id){
		return this.id = 'positions/'+id;
	}

	setDenomination(denomination){
		return this.denomination = denomination;
	}

	setAppointmentDate(appointmentDate){
		return this.appointmentDate = appointmentDate;
	}

	setPositionType(positionType){
		return this.positionType = positionType;
	}

	build(){
		return {
			denomination: 		this.denomination,
			appointmentDate: 	this.appointmentDate,
			id: 				this.id
		}
	}

}