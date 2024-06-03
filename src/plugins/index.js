import config from "./config.js";

config.plugins.forEach(plugin => {
    import(plugin);
})