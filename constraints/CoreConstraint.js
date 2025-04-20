

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
                }
            },
            email: {
                presence: true,
                email: true
            },
            number: {
                presence: true,
                numericality: {
                    onlyInteger: true,
                    greaterThan: 0
                }
            },
            message: {
                presence: true,
                length: {
                    minimum: 10
                }
            }
        }
    }
}


module.exports = CoreConstraint;