import { Servient } from "@node-wot/core"
import { HttpServer } from "@node-wot/binding-http"
import winston from "winston"

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
})

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    )
}

try {
    const servient = new Servient()
    servient.addServer(new HttpServer({ port: 8081 }))
    const wot = await servient.start()
    const thing = await wot.produce({
        "@context": "https://www.w3.org/2019/wot/td/v1",
        title: "MyCounter",
        properties: {
            count: {
                title: "Counter",
                type: "number",
            },
        },
    })
    logger.info(`Produced ${thing.getThingDescription().title}`)
    await thing.writeProperty("count", 0)

    await thing.expose()
    logger.info(`${thing.getThingDescription().title} ready`)
    logger.info(`TD : ${JSON.stringify(thing.getThingDescription())}`)

    const c = await thing.readProperty("count")
    logger.info(`count is ${c}`)
} catch (error) {
    logger.error(error)
}
