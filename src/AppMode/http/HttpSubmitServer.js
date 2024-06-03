import LLOneBotConfig from "../../../config/LLOneBotConfig.js";
import http from "http"
import logger from "../../util/logger.js";
import { actionLogger } from "../../util/logger.js";
import AnalysisSubmit from "./AnalysisSubmit.js";

// 创建一个 HTTP 服务
const server = http.createServer((req, res) => {
    if (req.url === LLOneBotConfig.httpSubmit.urlPath) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // 将二进制数据转为字符串
        });

        req.on('end', () => {
            // 处理body
			AnalysisSubmit.analysis(JSON.parse(body));
			
            // 响应给客户端
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('服务器已接收到请求\n');
        });
    } else {
        // 处理其他非 urlPath 的请求
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('未找到资源\n');
    }
});

// 服务器监听端口 31111
server.listen(LLOneBotConfig.httpSubmit.port, () => {
    actionLogger.info(`server start listen`, `:${LLOneBotConfig.httpSubmit.port}${LLOneBotConfig.httpSubmit.urlPath}`);
});
