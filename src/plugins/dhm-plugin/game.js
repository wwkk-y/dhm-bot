import MsgSubUtil from '../../util/MsgSubUtil.js'
import At from '../../common/message/At.js'
import Text from '../../common/message/Text.js';

// 游戏
let gameing = { qq: "gameName" };
let gameMenu = {
    "石头剪刀布": (msg) => {
        let allRst = ['石头', '剪刀', '布']
        if (allRst.includes(msg.content)) {
            let myRst = Math.floor(Math.random() * 3);
            return `我的结果: ${allRst[myRst]}`
        } 
    },
}

// 游戏逻辑
let gameLogic = (msg) => {
    if(gameing[msg.user_id] !== false){
        let gameRst = gameMenu[gameing[msg.user_id]](msg)
        if(gameRst !== undefined){
            return `${gameRst}\n输入'#结束游戏'结束游戏`;
        }
    }
}

MsgSubUtil.subContentR("#石头剪刀布", (msg) => {
    if (!(msg.user_id in gameing)) {
        // init
        gameing[msg.user_id] = false
        MsgSubUtil.subR({ user_id: msg.user_id }, gameLogic);
    }
    if (gameing[msg.user_id] === false) {
        gameing[msg.user_id] = "石头剪刀布"
        return [new At(msg.user_id), new Text('好的, 我们开始游戏')]
    } else {
        return [new At(msg.user_id), new Text(`你正在进行游戏: ${gameing[msg.user_id]}还未结束, 输入 #结束游戏 可以结束游戏`)]
    }

})

MsgSubUtil.subContentR("#结束游戏", (msg) => {
    gameing[msg.user_id] = false;
    return "好的, 我们不玩了";
})