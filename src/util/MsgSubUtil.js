import {sub} from "../common/PubSubObj.js";
import reply from "../common/reply.js";

/**
 * 订阅内容
 * @param {String | Array} content 
 * @param {Function} func 
 * @param {Object} topicObj 
 */
function subContent(content, func, topicObj = {}){
    if(!content){
        throw new Error("content 不能为空");
    }

    if(content instanceof Object){
        for(let c of content){
            let to = {...topicObj};
            to.content = c;
            sub(to, func);
        }
    } else{
        topicObj.content = content;
        sub(topicObj, func);
    }
}

/**
 * 订阅 前缀, 当 content 满足前缀为 prefix 时执行 func
 * @param {String} prefix 
 * @param {Function} func 
 * @param {Object} topicObj 
 */
function subPrefix(prefix, func, topicObj = {}){
    if(!prefix){
        throw new Error("prefix 不能为空");
    }

    sub(topicObj, (msg) => {
        if(msg.content && msg.content.startsWith(prefix)){
            func(msg);
        }
    })
}

/**
 * 订阅内容包含 content 的
 * @param {String | Array} content
 * @param {Function} func 
 * @param {Object} topicObj 
 */
function subContentContain(content, func, topicObj){
    if(!content){
        throw new Error("content 不能为空");
    }

    if(content instanceof Object){
        sub(topicObj, (msg) => {
            if(msg.content){
                for(let c of content){
                    if(msg.content.includes(c)){
                        func(msg);
                    }
                }
            }
        });

    } else{
        sub(topicObj, (msg) => {
            if(msg.content && msg.content.includes(content)){
                func(msg);
            }
        });
    }
}

/**
 * 订阅并回复
 * @param {Object} topicObj 
 * @param {Function} func 返回值为 message 
 */
function subAndReply(topicObj, func){
    sub(topicObj, (msg) => {
        let message = func(msg);
        reply.replyMsg(msg, message);
    })
}

/**
 * 订阅并回复文本
 * @param {Object} topicObj 
 * @param {Function} func 返回值为 string
 */
function subAndReplyText(topicObj, func){
    sub(topicObj, (msg) => {
        let text = func(msg);
        reply.replyTextMsg(msg, text);
    })
}

export default {
    subContent, subPrefix, subContentContain, 
    subAndReply, subAndReplyText,
};