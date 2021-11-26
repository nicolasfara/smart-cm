import {ExposedThing, ThingDescription} from "wot-typescript-definitions"
import Ajv from "ajv"
import {CoffeeMachine} from "../model/coffee-machine"
import {logger} from "../utils/logger"

enum Level {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}

interface ActionPayload {
    product: string
    sugarQuantity: number
    level: Level
}

/**
 * Handle all the handlers for the wot.
 */
export class HandlerManager {
    private validator: Ajv
    private thing: ExposedThing
    private coffeeMachine: CoffeeMachine
    private readonly td: ThingDescription

    constructor(thing: ExposedThing, coffeeMachine: CoffeeMachine) {
        this.thing = thing
        this.coffeeMachine = coffeeMachine
        this.td = thing.getThingDescription()
        this.validator = new Ajv()
    }

    // Properties handlers

    // Actions handlers

    /* eslint-disable @typescript-eslint/no-explicit-any */
    async deliverActionsHandler(params: any) {
        if (!this.validator.validate(this.td.actions.deliver.input, params)) {
            logger.error("Invalid input for action: 'deliver': " + JSON.stringify(params))
            throw Error(JSON.stringify(this.validator.errors))
        }
        const payload: ActionPayload = params as ActionPayload
        logger.debug("Request action 'deliver': " + JSON.stringify(payload))
        // Do business logic for deliver the beverage
    }

    // Events handlers

    /* eslint-disable @typescript-eslint/no-explicit-any */
    async maintenanceHandler(data: any) {
        logger.warn("Device out of order: " + JSON.stringify(data))
        // Notify the assistance!
    }
}
