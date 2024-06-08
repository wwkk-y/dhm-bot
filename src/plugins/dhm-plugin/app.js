import MsgSubUtil from '../../util/MsgSubUtil.js'
import PubSubObj from '../../common/PubSubObj.js';
import At from '../../common/message/At.js'
import Text from '../../common/message/Text.js';

MsgSubUtil.subContentContainR(['你好', 'hello'], (msg) => {
    return "你好, 我是dhm-bot, 很高兴认识你";
}, { atMe: true })

MsgSubUtil.subContentR('你好', (msg) => {
    return "你好呀"
}, { message_type: "private" })

MsgSubUtil.subPrefixR("#topic", (msg) => {
    let args = msg.content.split(' ');
    if(args.length === 2){
        let arg1 = args[1];
        if(arg1 === '-detail'){
            return JSON.stringify(PubSubObj.getSubTopicObjs(), null, 4);
        }
    } else{
        return JSON.stringify(PubSubObj.getSubTopics(), null, 4);
    }
})

import ("./game.js")