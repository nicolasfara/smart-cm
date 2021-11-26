import {ExposedThing} from "wot-typescript-definitions"
import {CoffeeMachine} from "../model/coffee-machine"
import {logger} from "../utils/logger"

/**
 * Handle all the handlers for the wot.
 */
export class HandlerManager {
    private thing: ExposedThing
    private coffeeMachine: CoffeeMachine

    constructor(thing: ExposedThing, coffeeMachine: CoffeeMachine) {
        this.thing = thing
        this.coffeeMachine = coffeeMachine
    }

    // Properties handlers

    // Actions handlers
    /* eslint-disable @typescript-eslint/no-explicit-any */
    async deliverActions(params: any, ): Promise<void> {
        logger.info("params: " + JSON.stringify(params))
    }

    // Events handlers
}
