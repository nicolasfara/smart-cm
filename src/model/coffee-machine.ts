import {Level, levelToInteger} from "./level"
import {v4} from "uuid"

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
    addNewProduct(product: Product): Promise<boolean>

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
}

/**
 * A single element used to produce the final product: e.g. Coffee, Tea, Sugar, Water, etc.
 */
class Product {
    id: string
    name: string
    quantity: number
    supplier: string

    constructor(id: string, name: string, quantity: number, supplier: string) {
        this.id = id
        this.name = name
        this.quantity = quantity
        this.supplier = supplier
    }
}

/**
 * .
 */
export class CoffeeMachineImpl implements CoffeeMachine {
    private machineId: string
    private products: Array<Product> = []

    constructor(startupProducts: Array<Product>) {
        this.machineId = v4()
        this.products.push(...startupProducts)
        this.initProducts()
    }

    private initProducts() {
        this.products.push(new Product(v4(), "Coffee", 100, "Nespresso"))
        this.products.push(new Product(v4(), "Milk", 100, "Lola"))
    }

    async makeBeverage(product: string, level: Level, sugar: number): Promise<boolean> {
        const prod = this.products.find(e => e.name === product)
        if (prod === undefined) throw Error(`Unable to find the product '${product}'`)
        const prodIndex = this.products.findIndex(e => e.name === product)
        this.products[prodIndex].quantity -= levelToInteger(level)
        // TODO(Decrease the sugar)
        return true
    }

    async addNewProduct(product: Product): Promise<boolean> {
        if (this.products.includes(product)) {
            return Promise.resolve(false)
        } else {
            this.products.push(product)
            return Promise.resolve(true)
        }
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
}
