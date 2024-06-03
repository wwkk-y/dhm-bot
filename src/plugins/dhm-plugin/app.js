import MsgSubUtil from '../../util/MsgSubUtil.js'
import PubSubObj from '../../common/PubSubObj.js';
import At from '../../common/message/At.js'
import Text from '../../common/message/Text.js';

MsgSubUtil.subContentContainR(['你好'], (msg) => {
    return "你好, 我是dhm-bot, 很高兴认识你";
}, { atMe: true })

MsgSubUtil.subContentR('你好', (msg) => {
    return "你好呀"
}, { message_type: "private" })

MsgSubUtil.subContentR("#topic", (msg) => {
    return JSON.stringify(PubSubObj.getSubTopicObjs(), null, 4);
})

let gameing = { qq: false };
MsgSubUtil.subContentContainR("玩石头剪刀布", (msg) => {
    if(!(msg.user_id in gameing)){
        // init
        gameing[msg.user_id] = false
        MsgSubUtil.subR({ user_id: msg.user_id, group_id: msg.group_id }, (msg) => {
            if (gameing[msg.user_id] === "石头剪刀布") {
                let allRst = ['石头', '剪刀', '布']
                if (allRst.includes(msg.content)) {
                    let myRst = Math.floor(Math.random() * 3);
                    return `我的结果: ${allRst[myRst]}`
                } else if (msg.content === '#结束游戏') {
                    gameing[msg.user_id] = false;
                    return `好的, 我们不玩了`;
                }
            }
        })
    }
    if (gameing[msg.user_id] === false) {
        gameing[msg.user_id] = "石头剪刀布"
        return [new At(msg.user_id), new Text('好的, 我们开始游戏')]
    } else {
        return [new At(msg.user_id), new Text(`你正在进行游戏: ${gameing[msg.user_id]}`)]
    }

}, { atMe: true })