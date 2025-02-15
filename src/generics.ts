import rbmq, { type Connection } from "amqplib"

interface pubSub{
    connect: () => Promise<void>,
}
export interface Publisher extends pubSub {
    sendMessage: (queue: QueueTypes, message: any) => Promise<void>
}
export interface Consumer extends pubSub {
    recieveMessage: (queue: QueueTypes, message: any) => Promise<void>
}

export class PubSubEntity implements pubSub{
    connection: Connection | undefined

    constructor(){
        this.connect()
    }

    async connect() {
        if(this.connection !== undefined){
            console.log("connection already exists")
            return
        }
        try {
            const conectionRBM = await rbmq.connect({
                password: "password",
                username: "user"
            })
        
            this.connection = conectionRBM

            console.log("producer listening with sucess")
        } catch (error) {
            console.log(error)
        }
    }
}


export enum QueueTypes{
    NEW_IOT_DEVICE_CONNECTED = "new-device",
    SET_NEW_DEVICE_CONFIGURATION = "config-device",
    SEND_TEST_MESSAGE = "test-message"
}