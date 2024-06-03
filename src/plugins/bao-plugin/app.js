import MsgSubUtil from "../../util/MsgSubUtil.js";
import {sub} from "../../common/PubSubObj.js";

let topicObj = {
    message_type: 'private',
    user_id: 3262954152
}

let contentToReply = {
    "你是谁": "你猜",
    "好不好": "好"
}
let contents = Object.keys(contentToReply);
for(let content of contents){
    let reply = contentToReply[content];
    MsgSubUtil.subContentR(content, () => reply, topicObj);
}

