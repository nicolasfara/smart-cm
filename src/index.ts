import { Servient } from "@node-wot/core"
import { HttpServer } from "@node-wot/binding-http"
import { td } from "./constants"

const thingServer = new Servient()
thingServer.addServer(
    new HttpServer({
        port: 8081,
    })
);

(async () => {
    const wot = await thingServer.start()
    const thing = await wot.produce(td)

    await thing.writeProperty("count", 0)
    await thing.expose()
})()