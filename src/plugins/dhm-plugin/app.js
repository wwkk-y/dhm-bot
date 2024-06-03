import MsgSubUtil from '../../util/MsgSubUtil.js'
import reply from '../../common/reply.js'
import Text from '../../common/message/Text.js'
import At from '../../common/message/At.js'

MsgSubUtil.subContentContain({content: '你好', atMe: true, message_type: 'group'}, (msg) => {
    reply.sendMsg(msg.user_id, [new At(msg.user_id), new Text(" 你好, 我是dhm-bot, 很高兴认识你")], msg.group_id)
})

MsgSubUtil.subContent({content: ['你好', '你好呀']}, (msg) => {
    reply.replyTextMsg(msg, "你好, 我是dhm-bot, 很高兴认识你")
})

MsgSubUtil.subPrefix({prefix: '#'}, (msg) => {
    reply.sendTextMsg(msg.user_id, "收到指令: " + msg.content)
})