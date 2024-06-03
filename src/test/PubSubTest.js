import PubSubObj from '../common/PubSubObj.js'

PubSubObj.sub({id: 1}, (...args) => console.log(args))

PubSubObj.sub({key1: 2}, (...args) => console.log(args))

PubSubObj.pub({id: 1, key1: 2}, 1, 2, 3);

PubSubObj.pub("topic");