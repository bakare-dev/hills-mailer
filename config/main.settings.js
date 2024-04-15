require("dotenv").config();
module.exports = {
  server: {
    port: process.env.PORT,
  },
  database: {
    development: {},
    test: {},
    production: {},
  },
  infrastructure: {
    winston: {
      server: process.env.WINSTONSOURCESERVER,
      sourceToken: process.env.WINSTONSOURCETOKEN,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USN,
      password: process.env.SMTP_PASSWORD,
    },
  },
  security: {},
  notifications: {
    reciever: process.env.NOTIFICATION_RECEIVERS,
  },
};
