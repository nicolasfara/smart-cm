export class Thingsdescriptors {
    public static readonly smartCm = {
        "@context": "https://www.w3.org/2019/wot/td/v1",
        title: "MyCounter",
        properties: {
            count: {
                title: "Counter",
                type: "number",
            },
        },
    }
}

export default new Thingsdescriptors()
