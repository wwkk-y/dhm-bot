import {sub} from "../common/PubSubObj.js";

/**
 * 订阅 内容
 * @param {Object} topicObj
 *  必须包含.content属性
 *      为字符串时, 做为content
 *      为数组时, 每一个content都绑定 
 * @param {Function} func 
 */
function subContent(topicObj, func){
    if(!topicObj.content){
        throw new Error("content 不能为空");
    }
    let content = topicObj.content;

    if(content instanceof Object){
        for(let c of content){
            let to = {...topicObj};
            to.content = c;
            sub(to, func);
        }
    } else{
        sub(topicObj, func);
    }
}

/**
 * 订阅 前缀, 当 content 满足前缀为 prefix 时执行func
 * @param {Object} topicObj
 *  必须包含prefix 
 * @param {Function} func 
 */
function subPrefix(topicObj, func){
    if(!topicObj.prefix){
        throw new Error("prefix 不能为空");
    }

    sub(topicObj, (msg) => {
        if(msg.content && msg.content.startsWith(prefix)){
            func(msg);
        }
    })
}

/**
 * 订阅内容包含
 * @param {Object} topicObj 
 * 必须包含.content属性
 *      为字符串时, 做为content
 *      为数组时, 每一个content都绑定 
 * @param {Function} func 
 */
function subContentContain(topicObj, func){
    if(!topicObj.content){
        throw new Error("content 不能为空");
    }
    let content = topicObj.content;
    delete topicObj.content;

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

export default {subContent, subPrefix, subContentContain}