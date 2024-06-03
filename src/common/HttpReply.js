import axios from "axios";
import logger from "../util/logger.js";
import { actionLogger } from "../util/logger.js";
import LLOneBotConfig from "../../config/LLOneBotConfig.js";
import Text from "./message/Text.js";
let { httpServer } = LLOneBotConfig;

/**
 * 发送信息
 * @param {Number} userId QQ
 * @param {Object} message 信息
 * @param {Number} groupId 群号, 没有则私发
 * @param {Boolean} autoEscape 
 */
function sendMsg(userId, message, groupId, autoEscape=false){
    let reply = {
        "user_id": userId,
        "message": message
    }
    if(groupId){
        reply.group_id = groupId;
        reply.message_type = "group";
    } else{
        reply.message_type = "private";
    }
    if(autoEscape){
        reply.auto_escape = autoEscape
    }
    axios.post(`${httpServer.url}:${httpServer.port}/send_msg`, reply).then(() => {
        actionLogger.info('sendMsg', reply);
    }).catch((error) => {
        logger.error(error);
    });
}

/**
 * 发送文字信息
 * @param {Number} userId QQ
 * @param {Object} text 信息
 * @param {Number} groupId 群号, 没有则私发
 * @param {Boolean} autoEscape 
 */
function sendTextMsg(userId, text, groupId, autoEscape=false) {
    sendMsg(userId, new Text(text), groupId, autoEscape)
}

/**
 * 回复信息
 * @param {Object} msg 
 * @param {Object} message 
 */
function replyMsg(msg, message){
    if(msg && msg.user_id){
        sendMsg(msg.user_id, message, msg.group_id);
    }
}

/**
 * 回复文字信息
 * @param {Object} msg 
 * @param {String} text 
 */
function replyTextMsg(msg, text){
    replyMsg(msg, new Text(text));
}


export default {sendTextMsg, sendMsg, replyMsg, replyTextMsg}