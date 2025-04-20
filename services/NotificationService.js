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
				sender: "no_reply@vinelogicsolutions.com",
				templateFile: "form-submit.ejs",
				subject: message.data.subject,
				recipients: item,
				data: message.data,
			};

			this.#mailer.sendMail(info, (response) => {
				callback(response);
			});
		});
	};
}

module.exports = NotificationService;
