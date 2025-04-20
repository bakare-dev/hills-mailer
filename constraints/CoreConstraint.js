let instance;

class CoreConstraint {
	constructor() {
		if (instance) return instance;

		instance = this;
	}

	submitFormConstraints = () => {
		return {
			fullname: {
				presence: true,
				length: {
					minimum: 3,
				},
			},
			email: {
				presence: true,
				email: true,
			},
			subject: {
				presence: true,
				length: {
					minimum: 10,
				},
			},
			message: {
				presence: true,
				length: {
					minimum: 10,
				},
			},
		};
	};
}

module.exports = CoreConstraint;
