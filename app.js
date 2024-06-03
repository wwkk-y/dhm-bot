import LLOneBotConfig from "./config/LLOneBotConfig.js"
import {actionLogger} from "./src/util/logger.js";

// 加载对于的模式下的代码
actionLogger.info("mode", LLOneBotConfig.mode)
import(`./src/AppMode/${LLOneBotConfig.mode}/app.js`);

// 加载plugins
import('./src/plugins/index.js')

