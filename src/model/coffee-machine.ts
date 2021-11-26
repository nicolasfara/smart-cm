import {v4} from "uuid"

/**
 * .
 */
export interface CoffeeMachine {
    /**
     * .
     */
    makeBeverage(): Promise<boolean>

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
    }


    async makeBeverage(): Promise<boolean> {
        return Promise.resolve(false)
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
        return Promise.resolve(this.products)
    }

    async availableProducts(): Promise<Array<Product>> {
        return Promise.resolve(this.products.filter(e => e.quantity != 0))
    }
}
