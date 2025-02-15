import { Consumer, PubSubEntity, QueueTypes } from "../generics";

class ChangeIotConfig extends PubSubEntity implements Consumer{

    constructor(){
        super()
    }


    async recieveMessage(queue: QueueTypes, message: any){
        if(this.connection === undefined){
            throw new Error("cannot listen to messages without a proper connection")
        }

        const channel = await this.connection.createChannel()

        if (!channel){
            throw new Error("cannot connect to a channel")
        }

        channel.addListener(queue, (ev) => {
            console.log(ev)
        })
    };
    
}