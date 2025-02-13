import fastify from "fastify";
import { Producer } from "./producers/producer.class";

const app = fastify()


const producer = new Producer()
console.log(producer)


app.listen({
    port: 3333
}).then(() => {
    console.log("Server listening...")
})