class Positions {

	constructor(PositionDTO) {
		this.id = PositionDTO.id;
		this.denomination = PositionDTO.denomination;
		this.appointmentDate = PositionDTO.appointmentDate;
		this.typeOfPosition = PositionDTO.typeOfPosition;
	}

	toDTO() {

	}

}

export default Positions;