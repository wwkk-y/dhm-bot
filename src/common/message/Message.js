class Message{
    /**
     * 消息
     * @param {String} type 消息类型 at|text|cq|file|...
     * @param {Object} data 消息内容
     */
    constructor(type, data){
        this.type = type;
        this.data = data;
    }
}


export default Message;