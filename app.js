import LLOneBotConfig from "./config/LLOneBotConfig.js"
import {actionLogger} from "./src/util/logger.js";

actionLogger.info("mode", LLOneBotConfig.mode)
import(`./src/AppMode/${LLOneBotConfig.mode}/app.js`);

// 加载plugins
import('./src/plugins/index.js')

