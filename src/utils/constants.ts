export const td = {
    "@context": "https://www.w3.org/2019/wot/td/v1",
    id: "urn:dev:1234-smart-cm",
    title: "MyCounter",
    properties: {
        products: {
            title: "List of all available products.",
            type: "array",
            readOnly: true,
            items: {
                type: "string"
            }
        },
        productsAvailability: {
            title: "The selected product to deliver",
            type: "string"
        },
        sugarAvailability: {
            title: "The available sugar in the machine express in percentage (%)",
            type: "integer",
            minimum: 0,
            maximum: 100
        },
        state: {
            title: "The state of the machine",
            enum: ["ready", "busy", "maintenance", "out-of-order"]
        }
    },
}
