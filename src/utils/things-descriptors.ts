export const smartCmTd = {
    "@context": "https://www.w3.org/2019/wot/td/v1",
    "id": "urn:dev:1234-smart-cm",
    "title": "Smart Coffee Machine",
    "securityDefinitions": {
        "nsec": {
            "scheme": "nosec"
        }
    },
    "security": "nsec",
    "properties": {
        "availableProducts": {
            "title": "List of all available products.",
            "type": "array",
            "readOnly": true,
            "writeOnly": false,
            "forms": [{
                "op": "readproperty",
                "href": "https://localhost:8081/properties/availableProducts",
                "contentType": "application/json"
            }],
            "items": {
                "type": "object",
                "readOnly": true,
                "writeOnly": false,
                "properties": {
                    "name": {
                        "title": "The name of the product",
                        "type": "string",
                        "readOnly": true,
                        "writeOnly": false
                    },
                    "id": {
                        "title": "The UUID4 that identifies the product",
                        "type": "string",
                        "format": "uuid",
                        "readOnly": true,
                        "writeOnly": false
                    },
                    "level": {
                        "title": "The level of the product in the machine",
                        "description": "The level field represent the number of unit of product: a unit correspond to the short unit level\nFor example: if medium is chose, the level is decreased by 2 unit",
                        "type": "integer",
                        "minimum": 0,
                        "readOnly": true,
                        "writeOnly": false
                    },
                    "supplier": {
                        "title": "The supplier of the product",
                        "type": "string",
                        "readOnly": true,
                        "writeOnly": false
                    }
                }
            }
        },
        "availableResourceLevel": {
            "title": "The current level of a given product",
            "description": "The current level of a given product. Requires resource id variable as uriVariables.\nThis property can be overridden to update his value",
            "type": "integer",
            "minimum": 0,
            "readOnly": true,
            "writeOnly": false,
            "forms": [{
                "op": "readproperty",
                "href": "https://localhost:8081/properties/availableResourceLevel",
                "contentType": "application/json"
            }],
            "uriVariables": {
                "productId": {
                    "title": "The UUID of the product",
                    "type": "string",
                    "format": "uuid",
                    "readOnly": false,
                    "writeOnly": false
                }
            }
        },
        "deliveryCounter": {
            "title": "The number of drinks made since now",
            "type": "integer",
            "minimum": 0,
            "readOnly": false,
            "writeOnly": false,
            "forms": [{
                "op": "readproperty",
                "href": "https://localhost:8081/properties/deliveryCount",
                "contentType": "application/json"
            }]
        },
        "maintenanceNeeded": {
            "title": "Shows whether a maintenance is needed. The property is observable.",
            "type": "boolean",
            "readOnly": false,
            "writeOnly": false,
            "observable": true,
            "forms": [{
                "op": ["readproperty", "observeproperty"],
                "href": "https://localhost:8081/properties/maintenanceNeeded",
                "contentType": "application/json"
            }]
        }
    },
    "actions": {
        "deliver": {
            "idempotent": false,
            "safe": false,
            "forms": [{
                "op": ["invokeaction"],
                "href": "https://localhost:8081/actions/deliver",
                "contentType": "application/json"
            }],
            "input": {
                "type": "object",
                "readOnly": true,
                "writeOnly": false,
                "properties": {
                    "product": {
                        "type": "string",
                        "readOnly": true,
                        "writeOnly": false
                    },
                    "sugar": {
                        "type": "integer",
                        "minimum": 0,
                        "maximum": 3,
                        "readOnly": true,
                        "writeOnly": false
                    },
                    "level": {
                        "enum": ["short", "medium", "large"],
                        "readOnly": true,
                        "writeOnly": false
                    }
                }
            }
        }
    },
    "events": {
        "outOfResource": {
            "title": "Out of resource event. This event is emitted when the available resource of a product is not sufficient",
            "data": {
                "type": "string",
                "readOnly": true,
                "writeOnly": false
            },
            "forms": [{
                "op": ["subscribeevent"],
                "href": "https://localhost:8081/events/outOfResources",
                "contentType": "application/json"
            }]
        }
    }
}
