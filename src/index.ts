import {CoffeeMachine, CoffeeMachineImpl} from "./model/coffee-machine"
import {HandlerManager} from "./handlers/handler-manager"
import { HttpServer } from "@node-wot/binding-http"
import { Servient } from "@node-wot/core"
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
    const coffeeMachine: CoffeeMachine = new CoffeeMachineImpl([])

    const handlerManager = new HandlerManager(thing, coffeeMachine)

    // Init thing properties
    await thing.writeProperty("availableProducts", await coffeeMachine.availableProducts())

    // Setup properties handlers
    thing.setPropertyReadHandler("availableProducts", async () => handlerManager.availableProductsReadHandler())
    thing.setPropertyReadHandler("availableResourceLevel", async p => handlerManager.availableResourceLevelReadHandler(p))

    // Setup action handler
    thing.setActionHandler("deliver", params => handlerManager.deliverActionsHandler(params))
    // thing.observeProperty("maintenanceNeeded", e => handlerManager.maintenanceHandler(e))

    // Run the thing
    await thing.expose()
})()
