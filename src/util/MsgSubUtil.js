import {sub} from "../common/PubSubObj.js";
import reply from "../common/reply.js";
import Message from "../common/message/Message.js";

/**
 * 订阅内容
 * @param {String | Array<String>} content 
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
 * @param {String | Array<String>} content
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
 * @param {Function} func 返回值为 Array<Message> | string
 */
function subR(topicObj, func){
    sub(topicObj, (msg) => {
        let message = func(msg);
        reply.replyMsg(msg, message);
    })
}

/**
 * 订阅前缀并回复, 当 content 满足前缀为 prefix 时执行 func
 * @param {String} prefix 
 * @param {Function} func 
 * @param {Object} topicObj 
 */
function subPrefixR(prefix, func, topicObj = {}){
    subPrefix(prefix, (msg) => {
        reply.replyMsg(msg, func(msg))
    }, topicObj);
}

/**
 * 订阅包含内容并回复
 * @param {String | Array<String>} content 
 * @param {Function} func 
 * @param {Object} topicObj 
 */
function subContentContainR(content, func, topicObj = {}){
    subContentContain(content, msg => reply.replyMsg(msg, func(msg)), topicObj);
}

/**
 * 
 * @param {String | Array<String>} content 
 * @param {Function} func 
 * @param {Object} topicObj 
 */
function subContentR(content, func, topicObj = {}){
    subContent(content, msg => reply.replyMsg(msg, func(msg)), topicObj)
}

export default {
    subContent, subPrefix, subContentContain, 
    subR, subPrefixR, subContentContainR,
};