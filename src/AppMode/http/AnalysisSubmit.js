import { actionLogger } from "../../util/logger.js";
import logger from "../../util/logger.js";
import PubSubObj from "../../common/PubSubObj.js";

export default {
    analysis(msg) {
        let pubObj = { ...msg };
        if (msg.post_type === "message") {
            pubObj.content = "";
            for (let message of msg.message) {
                if (message.type === "at") {
                    if (Number(message.data.qq) === msg.self_id) {
                        pubObj.atMe = true;
                    }
                }
                if (message.type === "text") {
                    pubObj.content += message.data.text;

                }
            }  
        }
        actionLogger.info("pub", pubObj);
        PubSubObj.pub(pubObj, pubObj);
    }
}