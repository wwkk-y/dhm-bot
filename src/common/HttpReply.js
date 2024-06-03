import axios from "axios";
import logger from "../util/logger.js";
import { actionLogger } from "../util/logger.js";
import LLOneBotConfig from "../../config/LLOneBotConfig.js";
let { httpServer } = LLOneBotConfig;

function sendTextMsg(userId, text, groupId, autoEscape=false) {
    let reply = {
        "user_id": userId,
        "message": [{
            "type": "text",
            "data": {
                "text": text
            }
        }]
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
        actionLogger.info('sendTextMsg', reply);
    }).catch((error) => {
        logger.error(error);
    });
}

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


export default {sendTextMsg, sendMsg}