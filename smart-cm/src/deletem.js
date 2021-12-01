// example-client.js
Servient = require("@node-wot/core").Servient
HttpClientFactory = require("@node-wot/binding-http").HttpClientFactory

Helpers = require("@node-wot/core").Helpers

// create Servient and add HTTP binding
let servient = new Servient()
servient.addClientFactory(new HttpClientFactory(null))

let wotHelper = new Helpers(servient)
wotHelper
    .fetch("http://10.0.1.0:8081/smart-coffee-machine/")
    .then(async (td) => {
        // using await for serial execution (note 'async' in then() of fetch())
        try {
            servient.start().then((WoT) => {
                WoT.consume(td).then((thing) => {
                    // read a property "string" and print the value
                    thing.subscribeEvent("outOfResource", (x) => {
                        console.info("onNext:", x)
                    })
                        .then(() => {
                            console.log("onCompleted")
                        })
                        .catch((e) => {
                            console.log("onError: %s", e)
                        })
                })
            })
        } catch (err) {
            console.error("Script error:", err)
        }
    })
    .catch((err) => {
        console.error("Fetch error:", err)
    })