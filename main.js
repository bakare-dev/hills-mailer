const Server = require("./server/Server");
const config = require("./config/main.settings");
const Logger = require("./utils/Logger");

const logger = new Logger().getLogger();


main = async () => {
    try{
        let server = new Server(config.server.port);
        server.start();
    } catch(err) {
        logger.error(err);
        process.exit(1);
    }
}

main();


