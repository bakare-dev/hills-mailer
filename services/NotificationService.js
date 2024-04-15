const Mailer = require("../utils/Mailer");

let instance;
class NotificationService {

    #mailer;

    constructor() {

        if (instance) return instance;

        this.#mailer = new Mailer();

        instance = this;

    }


    sendForm = async (message, callback) => {

       
        message.recipients.forEach(async (item) => {

            let info = {
                sender: "noreply@realighteduconsult.com",
                templateFile: "form-submit.ejs",
                subject: "Form Submission",
                recipients: item,
                data: message.data
            }

            this.#mailer.sendMail(info, (response) => {
                callback(response);
            })

        })


    }

}

module.exports = NotificationService;