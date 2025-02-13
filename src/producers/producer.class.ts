import rbmq from "amqplib"
import { PubSubEntity, Publisher } from "../generics"

export class Producer extends PubSubEntity implements Publisher{

    constructor(){
        super()
    }


    async sendMessage(queue: string, message: any, data: any){
        if (this.connection === undefined){
            throw new Error("cannot conect without a proper connetion socket")
        }

        const channel = await this.connection.createChannel()

        if (!channel){
            throw new Error("cannot connect to a channel")
        }

        const queue = "iot_queue"
        const message = JSON.stringify({deviceName: "solid", deviceOptions:"0 10 0 91 01 99 18 991 81"})

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(message))
    }
}