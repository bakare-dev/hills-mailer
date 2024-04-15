"use strict";
const express = require("express");
const Logger = require("../utils/Logger");
const CoreRouter = require("./routes/CoreRouter");


let instance;
class Server {

    #app;
    #port;
    #logger;

    constructor(port) {

        if (instance) return instance;

        this.#port = port;
        this.#configure();
        this.#buildRoutes();
        this.#logger = new Logger().getLogger();

        instance = this;

    }

    #configure = () => {

        this.#app = express();
        this.#app.use(express.json());

        this.#app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, source, auth_mode');
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            if (req.method === "OPTIONS") {
                return res.sendStatus(200);
            }
            next();
        });
    }

    #buildRoutes = () => {

        this.#app.get("/", (req, res) => {
            const message = {
                info: "You have reached notification-service",
                baseUrl: "/api/v1/",
                health: "/api/v1/health",
                docs: "/swagger",
            }
            res.json(message);
        });

        this.#app.get("/api/v1/health", async (req, res) => {
            const healthInfo = {
                appMemUsage: (process.memoryUsage().heapUsed / (1024 ** 3)).toFixed(2),
            };

            res.status(200).json(healthInfo);
        });

        this.#app.use("/api/v1/core", new CoreRouter().getRouter());
    }

    start = () => {
        this.#app.listen(this.#port, async () => {
            this.#logger.info(`notification-service now listening on port ${this.#port}`);
        })
    }

    getServerApp = () => {
        return this.#app;
    }
}

module.exports = Server;  
