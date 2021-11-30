/**
 * A single element used to produce the final product: e.g. Coffee, Tea, Sugar, Water, etc.
 */
export class Product {
    id: string
    name: string
    quantity: number
    supplier?: string

    constructor(id: string, name: string, quantity: number, supplier?: string) {
        this.id = id
        this.name = name
        this.quantity = quantity
        this.supplier = supplier
    }
}