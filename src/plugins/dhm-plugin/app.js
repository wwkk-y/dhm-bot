import MsgSubUtil from '../../util/MsgSubUtil.js'
import PubSubObj from '../../common/PubSubObj.js';

MsgSubUtil.subContentContainR(['你好'], (msg) => {
    return "你好, 我是dhm-bot, 很高兴认识你";
}, {atMe: true})

MsgSubUtil.subContentR('你好', (msg) => {
    return "你好呀"
}, {message_type: "private"})

MsgSubUtil.subContentR("#topic", (msg) => {
    return JSON.stringify(PubSubObj.getSubTopicObjs(), null, 4);
})