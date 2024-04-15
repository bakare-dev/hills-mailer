const { notifications } = require("../config/main.settings");
const Logger = require("../utils/Logger");
const NotificationService = require("./NotificationService");


let instance;

class CoreService {

    #logger;
    #notificationService;

    constructor () {
        
        if (instance) return instance;


        this.#logger = new Logger().getLogger();
        this.#notificationService = new NotificationService();


        instance = this;

    }

    submitForm = async (payload, callback) => {
        try {
            const notification = {
                recipients: [`${notifications.reciever}`],
                data: {
                    name: payload.fullname,
                    email: payload.email,
                    number: payload.number,
                    message: payload.message
                },
            }

            this.#notificationService.sendForm(notification, (resp) => {
                if (resp.status == 'success') {
                    callback({ status: 200, message: "Message sent successfully" })
                } else {
                    callback({ status: 500, message: "Error occurred sending Message" })
                }
            })
        } catch (err) {
            this.#logger.error(err);
            callback({ status: 500, message: err.message })
        }
    }
}

module.exports = CoreService;