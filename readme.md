本项目是一个基于LLOneBot的QQ机器人

* node版本: 22.2.0

* [LLOneBot](https://github.com/LLOneBot/LLOneBot) 版本: 3.26.4 

使用pnpm进行管理, 安装方法

```bash
npm i -g pnpm
pnpm i
```

文件命名规范

- 多个单词大驼峰
- 单个单词小写(除非专用词)

编码规划

- 函数里不应该修改对象参数, 如果需要, 拷贝一份对象再使用

## http 模式流程

服务器 -> 收到信息 -> 分析信息 -> 发布信息到对应分类

处理器 -> 订阅信息 -> 处理

订阅内容: 

* [上报消息](https://docs.go-cqhttp.org/event/#%E6%89%80%E6%9C%89%E4%B8%8A%E6%8A%A5)
* [消息类型](https://docs.go-cqhttp.org/cqcode/#%E8%BD%AC%E4%B9%89)

```js
{
    ...msg, // msg详见上报消息
    content: "内容", // 检测 文本消息内容 (指令)
    atMe: true, // 是否 at 自己
}
```

### 编写 plugin 步骤

* 在 src/plugins/ 里建立一个新的 plugin 包, 写一个主程序js文件
* 修改 src/plugins/config.js, 在 plugins 里添加 主程序 js 文件

```js
// test-plugin/app.js
import MsgSubUtil from '../../util/MsgSubUtil.js'

MsgSubUtil.subPrefixR("#", (msg) => {
    return "收到指令: " + msg.content;
})
```

```js
export default {
    plugins: ["./test-plugin/app.js"]
}
```

## TODO

* 参数校验