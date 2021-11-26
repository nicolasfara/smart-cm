import { Servient } from "@node-wot/core"
import { HttpServer } from "@node-wot/binding-http"
import { logger } from "./utils/logger"
import { smartCmTd } from "./utils/things-descriptors"
import {HandlerManager} from "./handlers/HandlerManager"
import {CoffeeMachine, CoffeeMachineImpl} from "./model/coffee-machine"

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
    const coffeeMachine: CoffeeMachine = new CoffeeMachineImpl([])

    const handlerManager = new HandlerManager(thing, coffeeMachine)

    thing.setActionHandler("deliver", handlerManager.deliverActions)
    await thing.expose()
})()
