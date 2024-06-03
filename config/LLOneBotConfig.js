export default {
    mode: "http", // 模式 http(http发送请求 + 事件上报), 未来支持WebSocket
    httpServer: {
        url: "http://127.0.0.1", // Http服务地址
        port: 3110 // 端口
    },
    httpSubmit: { // http上报端口
        port: 31111, // 请求端口
        urlPath: "/bot/submit" // 请求路径
    },
    webSocket: {
        
    }
}