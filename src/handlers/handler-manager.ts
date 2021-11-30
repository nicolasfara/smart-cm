import {ExposedThing, ThingDescription} from "wot-typescript-definitions"
import Ajv from "ajv"
import {CoffeeMachine} from "../model/coffee-machine"
import {Level} from "../model/level"
import {Product} from "../model/product"
import addFormats from "ajv-formats"
import {logger} from "../utils/logger"
import {v4} from "uuid"

interface DeliverActionPayload {
    product: string
    sugar: number
    level: Level
}

interface AddProductAction {
    product: string
    quantity: number
    supplier: string
}

/**
 * Handle all the handlers for the wot.
 */
export class HandlerManager {
    private readonly validator: Ajv
    private thing: ExposedThing
    private coffeeMachine: CoffeeMachine
    private readonly td: ThingDescription

    constructor(thing: ExposedThing, coffeeMachine: CoffeeMachine) {
        this.thing = thing
        this.coffeeMachine = coffeeMachine
        this.td = thing.getThingDescription()
        this.validator = new Ajv()
        addFormats(this.validator)
        this.coffeeMachine.onMaintenanceHandler(msg => this.outOfOrderHandler(msg))
    }

    private async outOfOrderHandler(msg: any) {
        await this.thing.writeProperty("maintenanceNeeded", true)
        this.thing.emitEvent("outOfResource", msg)
    }

    // Properties handlers
    async availableProductsReadHandler() {
        const products = await this.coffeeMachine.availableProducts()
        if (!this.validator.validate(this.td.properties.availableProducts.items, this.coffeeMachine.allProducts())) {
            throw Error(JSON.stringify(this.validator.errors))
        }
        return products
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    async availableResourceLevelReadHandler(params: any) {
        if (params === undefined) {
            throw Error(`Malformed uriVariables parameters`)
        }
        if (!this.validator.validate(this.td.properties.availableResourceLevel.uriVariables.productId, params.uriVariables.productId)) {
            throw Error(JSON.stringify(this.validator.errors))
        }
        const productId: { productId: string } = params.uriVariables
        const prodLevel = (await this.coffeeMachine.allProducts()).find(e => e.id == productId.productId)
        if (prodLevel === undefined) {
            throw Error(`Unable to find the id: ${productId.productId}`)
        }
        return prodLevel.quantity
    }

    async deliveryCounterReadHandler() {
        return this.coffeeMachine.deliveryCount()
    }

    // Actions handlers

    /* eslint-disable @typescript-eslint/no-explicit-any */
    async deliverActionsHandler(params: any) {
        if (!this.validator.validate(this.td.actions.deliver.input, params)) {
            logger.error("Invalid input for action: 'deliver': " + JSON.stringify(params))
            throw Error(JSON.stringify(this.validator.errors))
        }
        const payload: DeliverActionPayload = params as DeliverActionPayload
        logger.debug("Request action 'deliver': " + JSON.stringify(payload))
        if (await this.coffeeMachine.isFinished(payload.product)) {
            throw Error(`The product '${payload.product} is finished. No delivery can be made`)
        }
        const isSuccess = await this.coffeeMachine.makeBeverage(payload.product, payload.level, payload.sugar)
        if (!isSuccess) throw Error("Failed to make the beverage")
        // Do business logic for deliver the beverage
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    async addProductHandler(params: any) {
        if (!this.validator.validate(this.td.actions.addProduct.input, params)) {
            throw Error(JSON.stringify(this.validator.errors))
        }
        const product = params as AddProductAction
        await this.coffeeMachine.addNewProduct(new Product(v4(), product.product, product.quantity, product.supplier))
    }

    // Events handlers

    /* eslint-disable @typescript-eslint/no-explicit-any */
    async maintenanceHandler(data: any) {
        logger.warn("Device out of order: " + JSON.stringify(data))
        // Notify the assistance!
    }
}
