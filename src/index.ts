import { Servient } from "@node-wot/core"
import { HttpServer } from "@node-wot/binding-http"
import { logger } from "./utils/logger"
import { smartCmTd } from "./utils/things-descriptors"

const thingServer = new Servient()
thingServer.addServer(
    new HttpServer({
        port: 8081,
    })
);

(async () => {
    logger.info("Starting thing")
    const wot = await thingServer.start()
    const thing = await wot.produce(smartCmTd)
    thing.setActionHandler("deliver", async (params, ) => {
        logger.info("params: " + JSON.stringify(params))
    })
    await thing.expose()
})()
