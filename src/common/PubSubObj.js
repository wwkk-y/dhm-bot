/**
 * 实现一个基于对象主题的发布订阅者模型
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
import logger from '../util/logger.js'
import { actionLogger } from '../util/logger.js';

let subTopicObjs = ["topic.0.0.0"];
let subFuncs = [() => console.log("topic.0.0.0")];

/**
 * 判断 source 的每一个属性的值是不是等于 target 该属性对应的值
 * @param {Object} source 
 * @param {Object} target 
 * @returns bool
 */
function isObjFeildAllEqual(source, target) {
    if (source instanceof Object && target instanceof Object) {
        for (let key in source) {
            if (!isObjFeildAllEqual(source[key], target[key])) {
                return false;
            }
        }
        return true;
    } else {
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
        if (isObjFeildAllEqual(subTopicObj, topicObj)) {
            let func = subFuncs[i];
            func(...args);
        }
    }
}

/**
 * 订阅消息
 * @param {Object} topicObj
 * @param {Function} func 
 */
let sub = (topicObj, func) => {
    subTopicObjs.push(topicObj);
    subFuncs.push(func);
}

export { pub, sub }

export default {
    pub, sub
}