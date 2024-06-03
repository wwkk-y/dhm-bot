import LLOneBotConfig from "../../config/LLOneBotConfig.js";
import HttpReply from './HttpReply.js'

let exportDefault = {};

if (LLOneBotConfig.mode === "http"){
    exportDefault = HttpReply
}

export default exportDefault;