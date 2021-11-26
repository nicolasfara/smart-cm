export const smartCmTd = {
    "@context": "https://www.w3.org/2019/wot/td/v1",
    id: "urn:dev:1234-smart-cm",
    title: "Smart Coffee Machine",
    properties: {
        availableProducts: {
            title: "List of all available products.",
            type: "array",
            readOnly: true,
            items: {
                type: "object",
                properties: {
                    name: {
                        title: "The name of the product",
                        type: "string"
                    },
                    id: {
                        title: "The UUID4 that identifies the product",
                        type: "string"
                    },
                    level: {
                        title: "The level of the product in the machine",
                        type: "integer",
                        minimum: 0,
                        maximum: 100,
                        unit: "percent"
                    }
                }
            }
        },
        availableResourceLevel: {
            title: "The current level of a given product",
            description: "The current level of a given product. Requires resource id variable as uriVariables.\nThis property can be overridden to update his value",
            type: "integer",
            minimum: 0,
            maximum: 100,
            unit: "percent",
            uriVariables: {
                id: {
                    type: "string"
                }
            }
        },
        deliveryCounter: {
            title: "The number of drinks made since now",
            type: "integer",
            minimum: 0,
            readOnly: true
        },
        maintenanceNeeded: {
            title: "Shows whether a maintenance is needed. The property is observable.",
            type: "boolean",
            readOnly: true,
            observable: true
        }
    },
    actions: {
        deliver: {
            idempotent: false,
            input: {
                type: "object",
                properties: {
                    product: {
                        type: "string"
                    },
                    sugar: {
                        type: "integer",
                        minimum: 0,
                        maximum: 3,
                    },
                    level: {
                        enum: ["short", "medium", "large"]
                    }
                }
            }
        }
    },
    events: {
        outOfResource: {
            title: "Out of resource event. This event is emitted when the available resource of a product is not sufficient",
            data: {
                type: "String"
            }
        }
    }
}
