import MsgSubUtil from '../../util/MsgSubUtil.js'
import reply from '../../common/reply.js'
import Text from '../../common/message/Text.js'
import At from '../../common/message/At.js'

MsgSubUtil.subContentContain('你好', (msg) => {
    reply.sendMsg(msg.user_id, [new At(msg.user_id), new Text(" 你好, 我是dhm-bot, 很高兴认识你")], msg.group_id)
}, {atMe: true})

MsgSubUtil.subContent(['你好', '你好呀'], (msg) => {
    reply.replyTextMsg(msg, "你好, 我是dhm-bot, 很高兴认识你")
})

MsgSubUtil.subPrefix("#", (msg) => {
    reply.sendTextMsg(msg.user_id, "收到指令: " + msg.content)
})

MsgSubUtil.subAndReply({content: "#"}, (msg) => {
    return "2:" + msg.content;
})