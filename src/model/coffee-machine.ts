import {Level, levelToInteger} from "./level"
import {Product} from "./product"
import {v4} from "uuid"
import {logger} from "../utils/logger"

/**
 * .
 */
export interface CoffeeMachine {
    /**
     * .
     */
    makeBeverage(product: string, level: Level, sugar: number): Promise<boolean>

    /**
     * .
     * @param product.
     */
    addNewProduct(product: Product): Promise<void>

    /**
     * .
     */
    availableProducts(): Promise<Array<Product>>

    /**
     * .
     */
    allProducts(): Promise<Array<Product>>

    /**
     * Check if the given product is finished.
     * @param product the product name to check.
     */
    isFinished(product: string): Promise<boolean>

    /**
     * Return the number of product made since now.
     */
    deliveryCount(): Promise<number>

    /**
     * Handler is called when the machine is out of order.
     * @param handler the handler to call
     */
    onMaintenanceHandler(handler: (message: any) => void): void
}

/**
 * .
 */
export class CoffeeMachineImpl implements CoffeeMachine {
    private machineId: string
    private products: Array<Product> = []
    private sugar: Product
    private deliveryCounter = 0
    private outOfOrderHandler: ((message: any) => void) | undefined

    constructor(startupProducts: Array<Product>, sugar: Product) {
        this.machineId = v4()
        this.products.push(...startupProducts)
        this.sugar = sugar
        this.initProducts()
    }

    private initProducts() {
        this.products.push(new Product(v4(), "Coffee", 20, "Nespresso"))
        this.products.push(new Product(v4(), "Milk", 20, "Lola"))
    }

    async makeBeverage(product: string, level: Level, sugar: number): Promise<boolean> {
        const prod = this.products.find(e => e.name === product)
        if (prod === undefined) throw Error(`Unable to find the product '${product}'`)
        if (prod.quantity < levelToInteger(level)) throw Error(`Not sufficient level of '${product}'!`)
        const prodIndex = this.products.findIndex(e => e.name === product)
        this.products[prodIndex].quantity -= levelToInteger(level)
        this.sugar.quantity =- sugar
        this.deliveryCounter += 1

        // Check if the machine is out of order
        if (await this.isFinished(product) && this.outOfOrderHandler !== undefined) {
            logger.warn(`The product ${product} is finished`)
            this.outOfOrderHandler(`The product ${product} is finished!`)
        }
        return true
    }

    async addNewProduct(product: Product): Promise<void> {
        const findProduct = this.products.find(e => e.name == product.name && e.supplier === product.supplier)
        if (findProduct !== undefined) { // I've already the product, increase only the quantity
            findProduct.quantity += product.quantity
            return
        }
        this.products.push(product)
    }

    async allProducts(): Promise<Array<Product>> {
        return this.products
    }

    async availableProducts(): Promise<Array<Product>> {
        return this.products.filter(e => e.quantity != 0)
    }

    async isFinished(product: string): Promise<boolean> {
        const prod = this.products.find(e => e.name === product)
        if (prod === undefined) {
            throw Error(`Unable to find ${product} in all available products`)
        }
        return prod.quantity === 0
    }

    async deliveryCount(): Promise<number> {
        return this.deliveryCounter
    }

    async onMaintenanceHandler(handler: (message: any) => void): Promise<void> {
        this.outOfOrderHandler = handler
    }
}
