import fastify from "fastify";
import  Producer  from "./producers/producer.class";
import { QueueTypes } from "./generics";
import changeIotConfig from "./iot/change-iot-config";

const app = fastify()


changeIotConfig.recieveMessage(QueueTypes.SEND_TEST_MESSAGE, "nothing")


app.get("/", (req, res) => {
    const message = {
        message: "test"
    }
    Producer.sendMessage(QueueTypes.SEND_TEST_MESSAGE, JSON.stringify(message))
    res.send("ok")
})

app.listen({
    port: 3333
}).then(() => {
    console.log("Server listening...")
})