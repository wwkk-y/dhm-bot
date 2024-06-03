import MsgSubUtil from '../../util/MsgSubUtil.js'

MsgSubUtil.subPrefixR("#", (msg) => {
    return "收到指令: " + msg.content;
})

MsgSubUtil.subContentContainR(['你好'], (msg) => {
    return "你好, 我是dhm-bot, 很高兴认识你";
}, {atMe: true})

MsgSubUtil.subContentR('你好', (msg) => {
    return "你好呀"
}, {message_type: "private"})