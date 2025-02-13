import rbmq, { type Connection } from "amqplib"

interface pubSub{
    connect: () => Promise<void>,
}
export interface Publisher<T> extends pubSub {
    sendMessage: Promise<(queue: string, message: any, data: T | null) => void>
}
export interface Consumer<T> extends pubSub {
    recieveMessage: Promise<(queue: string, message: any, data: T | null) => void>
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
