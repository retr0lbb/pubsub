import rbmq from "amqplib"

export class Producer{
    private connectionSocket: rbmq.Connection | undefined

    constructor(){
        this.connect()
    }


    private async connect(){
        try {
            const conection = await rbmq.connect({
                password: "password",
                username: "user"
            })

            this.connectionSocket = conection
        } catch (error) {
            console.log(error)
        }
    }

    async sendMessage(){
        if (this.connectionSocket === undefined){
            throw new Error("cannot conect without a proper connetion socket")
        }

        const channel = await this.connectionSocket.createChannel()

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