import rbmq, { type Connection } from "amqplib"

interface pubSub{
    connect: () => Promise<void>,
}
export interface Publisher extends pubSub {
    sendMessage: Promise<(queue: string, message: any) => Promise<void>>
}
export interface Consumer extends pubSub {
    recieveMessage: Promise<(queue: string, message: any) => Promise<void>>
}

export class PubSubEntity implements pubSub{
    connection: Connection | undefined

    constructor(){
        this.connect()
    }

    async connect() {
        try {
            const conectionRBM = await rbmq.connect({
                password: "password",
                username: "user"
            })
        
            this.connection = conectionRBM
        } catch (error) {
            console.log(error)
        }
    }
}
