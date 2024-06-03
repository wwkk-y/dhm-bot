const http = require('http');
const axios = require('axios');

function send_msg_text(user_id, msg){
	axios.post('http://127.0.0.1:3110/send_msg', {
		"user_id": user_id,
		"message": [{
			"type": "text",
			"data": {
				"text": msg
			}
		}]
	}).then(data => {
		console.log('[send_msg_text]', user_id, msg);
	})
	.catch((error) => {
		console.error('[error]', error);
	});

}

function analysis(message){
	if(message.post_type === "message" && message.sub_type === "friend"){
		console.info("[message]", message);
		send_msg_text(message.user_id, "get " + message.message[0].data.text)
	} else{
		console.info("[not handle]", message);
	}
}

// 创建一个 HTTP 服务
const server = http.createServer((req, res) => {
    // 打印请求的详细信息
    // console.log(`请求方法: ${req.method}`);
    // console.log(`请求头: ${JSON.stringify(req.headers)}`);
    if (req.url === '/bot/submit') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // 将二进制数据转为字符串
        });

        req.on('end', () => {
            // 打印请求的内容
            // console.log(`请求内容: ${body}`);
			// TODO 处理body
			analysis(JSON.parse(body));
			
            // 响应给客户端
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('服务器已接收到请求\n');
        });
    } else {
        // 处理其他非 /bot/submit 的请求
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('未找到资源\n');
    }
});

// 服务器监听端口 31111
const PORT = 31111;
server.listen(PORT, () => {
    console.info(`[info] start in port: ${PORT}`);
});
