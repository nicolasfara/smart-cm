import Stripe from "stripe"

interface PaymentRequest {
    name: string
    email: string
    source: string // Token ID
}

export class PaymentManager {
    private stripe = new Stripe(
        process.env.STRIPE_API_KEY || "",
        { apiVersion: '2020-08-27' }
    )

    async paymentIntent(params: PaymentRequest, amount: number, description: string): Promise<boolean> {
        try {
            const customer = await this.stripe.customers.create(params)
            await this.stripe.charges.create({
                amount: amount,
                currency: "eur",
                customer: customer.id,
                description: description
            })
            return true
        } catch (e) {
            throw Error("Unable to make the payment")
        }
    }
}