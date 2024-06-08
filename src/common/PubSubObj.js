/**
 * 实现一个基于对象主题的发布订阅者模型, 默认只比较一层
 * 举一个例子
 *  发布一个主题对象为
 *  {
 *      key1: val1,
 *      key2: val2
 *  }
 *  那么就执行订阅了以下主题的函数
 *  {
 *      key1: val1
 *  }
 *  {
 *      key2: val2
 *  }
 *  {
 *      key1: val1,
 *      key2: val2
 *  }
 */

import { actionLogger } from "../util/logger.js";
import {v4 as uuidv4} from 'uuid'

let subTopicObjs = [{topic: "topic.0.0.0"}];
let subFuncs = [() => console.log("topic.0.0.0")];

/**
 * 判断 source 的每一个属性的值是不是等于 target 该属性对应的值
 * @param {Object} source 
 * @param {Object} target 
 * @param {Number} depth 比较深度, 默认一层
 * @returns {Boolean}
 */
function isObjFeildAllEqual(source, target, depth = 1) {
    if(depth === 0) return true;

    if (source instanceof Object && target instanceof Object) {
        // 为对象时比较属性
        for (let key in source) {
            if(source[key] instanceof Object && target[key] instanceof Object){
                // 为对象就递归继续比较
                if (!isObjFeildAllEqual(source[key], target[key], depth - 1)) {
                    return false;
                }
            } else{
                // 不为对象时直接比较值
                return source[key] === target[key];
            }
        }
        return true;
    } else {
        // 不为对象时直接比较值
        return source === target;
    }
}

/**
 * 发布消息
 * @param {Object} topicObj 
 * @param  {...any} args 
 */
let pub = (topicObj, ...args) => {
    for (let i = 0; i < subTopicObjs.length; ++i) {
        let subTopicObj = subTopicObjs[i];
        if (isObjFeildAllEqual(subTopicObj.topic, topicObj)) {
            let func = subFuncs[i];
            func(...args);
        }
    }
}

/**
 * 订阅消息
 * @param {Object} topicObj
 * @param {Function} func 
 * @param {Object} comment 注释
 * @returns {String} id 订阅的唯一标识
 */
let sub = (topicObj, func, comment) => {
    let to = {
        topic: {...JSON.stringify(JSON.parse(topicObj))}, // 需要持久化保存 clone一份 不能受外部影响
        id: uuidv4()
    }
    if(comment != undefined){
        to['comment'] = comment;
    }
    subTopicObjs.push(to);
    subFuncs.push(func);
    return to.id;
}

/**
 * 取消订阅消息
 * @param {String} id 
 */
let unSub = (id) => {
    for(let i = 0; i < subTopicObjs.length; ++i){
        if(subTopicObjs[i].id === id){
            // 删除 subTopicObj
            // 删除 subFunc
            subTopicObjs.splice(i, 1);
            subFuncs.slice(i, 1);
            break;
        }
    }
}

function getSubTopicObjs(){
    return subTopicObjs;
}

function getSubTopics(){
    return subTopicObjs.map(to => to.topic)
}

export {
    pub, sub , unSub,
    getSubTopicObjs, getSubTopics
};

export default {
    pub, sub , unSub,
    getSubTopicObjs, getSubTopics
};