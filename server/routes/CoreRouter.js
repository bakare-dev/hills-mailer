let express = require("express");
let CoreController = require("../../controllers/CoreController");


let instance;
class CoreRouter {

    #router;
    #controller;


    constructor() {

        if (instance) return instance;

        this.#router = express.Router();
        this.#controller = new CoreController();
        this.#configure();


        instance = this;

    }

    #configure = () => {
        this.#router.post("/submit-form", this.#controller.submitForm);
    }

    getRouter = () => {
        return this.#router;
    }
}


module.exports = CoreRouter;