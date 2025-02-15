import rbmq from "amqplib"
import { PubSubEntity, Publisher, QueueTypes } from "../generics"

class Producer extends PubSubEntity implements Publisher{

    constructor(){
        super()
    }


    async sendMessage(queue: QueueTypes, message: any){
        if (this.connection === undefined){
            throw new Error("cannot conect without a proper connetion socket")
        }

        const channel = await this.connection.createChannel()

        if (!channel){
            throw new Error("cannot connect to a channel")
        }

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(message))
        
    }
}

export default new Producer()