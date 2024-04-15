const validate = require('validate.js');
const CoreService = require('../services/CoreService');
const CoreConstraint = require('../constraints/CoreConstraint');
const Logger = require('../utils/Logger');


let instance;


class CoreController {

    #service;
    #constraint;
    #logger;
    #authenticator;


    constructor() {

        if (instance) return instance;

        this.#service = new CoreService();
        this.#logger = new Logger().getLogger();
        this.#service = new CoreService();
        this.#constraint = new CoreConstraint()

        instance = this;

    }

    submitForm = async (req, res) => {
        try {
            const validation = validate(req.body, this.#constraint.submitFormConstraints());

            if (validation) {
                return res.status(422).json({message: "validation error", data: { validation }});
            }

            this.#service.submitForm(req.body, (response) => {
                res.status(response.status).json(response);
            });

        } catch (err) {
            this.#logger.error(err);
            res.status(500).json({ status: "500", message: "Internal server error"});
        }
    }

}


module.exports = CoreController;