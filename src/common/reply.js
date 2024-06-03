import LLOneBotConfig from "../../config/LLOneBotConfig.js";
import HttpReply from './HttpReply.js'

// 接口对象, 只提供模范
let exportDefault = {

    /**
     * 发送信息
     * @param {Number} userId QQ
     * @param {Array<Message>} message 信息
     * @param {Number} groupId 群号, 没有则私发
     * @param {Boolean} autoEscape 
     */
    sendMsg(userId, message, groupId, autoEscape = false) {
        throw new Error("interface can not be used");
    },

    /**
     * 发送文字信息
     * @param {Number} userId QQ
     * @param {String} text 信息
     * @param {Number} groupId 群号, 没有则私发
     * @param {Boolean} autoEscape 
     */
    sendTextMsg(userId, text, groupId, autoEscape = false) {
        throw new Error("interface can not be used");
    },

    /**
     * 回复信息
     * @param {Object} msg 收到的信息
     * @param {Array<Message> | String} message 回复的信息
     */
    replyMsg(msg, message) { 
        throw new Error("interface can not be used");
    }
};

if (LLOneBotConfig.mode === "http") {
    exportDefault = HttpReply
}

export default exportDefault;