import {CoffeeMachine, CoffeeMachineImpl} from "./model/coffee-machine"
import {HandlerManager} from "./handlers/handler-manager"
import { HttpServer } from "@node-wot/binding-http"
import {Product} from "./model/product"
import { Servient } from "@node-wot/core"
import { logger } from "./utils/logger"
import { smartCmTd } from "./utils/things-descriptors"
import {v4} from "uuid"

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
    const coffeeMachine: CoffeeMachine = new CoffeeMachineImpl([], new Product(v4(), "sugar", 130))

    const handlerManager = new HandlerManager(thing, coffeeMachine)

    // Init thing properties
    await thing.writeProperty("availableProducts", await coffeeMachine.availableProducts())
    await thing.writeProperty("maintenanceNeeded", false)

    // Setup properties handlers
    thing.setPropertyReadHandler("availableProducts", async () => handlerManager.availableProductsReadHandler())
    thing.setPropertyReadHandler("availableResourceLevel", async p => handlerManager.availableResourceLevelReadHandler(p))
    thing.setPropertyReadHandler("deliveryCounter", () => handlerManager.deliveryCounterReadHandler())

    // Setup action handler
    thing.setActionHandler("deliver", params => handlerManager.deliverActionsHandler(params))
    thing.setActionHandler("addProduct", params => handlerManager.addProductHandler(params))

    // Run the thing
    await thing.expose()
})()
