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

## http 模式流程

服务器 -> 收到信息 -> 分析信息 -> 发布信息到对应分类

处理器 -> 订阅信息 -> 处理

订阅内容: 

```js
{
    content: "内容", // 检测 文本消息内容 (指令)
    atMe: true, // 是否 at 自己
}
```

### 编写 plugin 步骤

* 在 src/plugins/ 里建立一个新的 plugin 包, 写一个主程序js文件
* 在 src/plugins/index.js 下 import 主程序 js 文件

```js
import('./test-plugin/app.js')
```