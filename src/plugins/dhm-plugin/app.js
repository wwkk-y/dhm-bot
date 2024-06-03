import MsgSubUtil from '../../util/MsgSubUtil.js'

MsgSubUtil.subPrefixR("#", (msg) => {
    return "收到指令: " + msg.content;
})

MsgSubUtil.subContentContain(['你好', '你好呀'], (msg) => {
    return "你好, 我是dhm-bot, 很高兴认识你";
}, {atMe: true})