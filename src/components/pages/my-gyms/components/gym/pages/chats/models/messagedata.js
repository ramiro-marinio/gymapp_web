export class MessageData{
    constructor(
        gymId,
        senderId,
        receiverId,
        message,
        timestamp,
    ){
        this.gymId = gymId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
        this.timestamp = timestamp;
    }
    static fromJson(json){
        return new MessageData(
            json.gymId,
            json.senderId,
            json.receiverId,
            json.message,
            json.timestamp
        )
    }
    toJson(){
        return {
            gymId:this.gymId,
            senderId:this.senderId,
            receiverId:this.receiverId,
            message:this.message,
            timestamp:this.timestamp,
        }
    }
}