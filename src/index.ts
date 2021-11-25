import { Servient } from "@node-wot/core"
import { HttpServer } from "@node-wot/binding-http"
import { logger } from "./utils/logger"
import { td } from "./utils/constants"

const thingServer = new Servient()
thingServer.addServer(
    new HttpServer({
        port: 8081,
    })
);

(async () => {
    logger.info("Starting thing")
    const wot = await thingServer.start()
    const thing = await wot.produce(td)
    await thing.writeProperty("products", ["coffee", "milk"])
    thing.setActionHandler("deliver", async (params, ) => {
        logger.info("params: " + JSON.stringify(params))
    })
    await thing.expose()
})()
