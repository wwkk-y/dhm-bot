import chalk from 'chalk';

let logger = {
    info(...args){
        console.log(chalk.green('[INFO]'), ...args); // ...arguments
    },
    warn(...args){
        console.log(chalk.yellow('[WARN]'), ...args);
    },
    error(...args){
        console.log(chalk.red('[ERROR]'), ...args);
    }
}

export default logger;

function generateOutput(...args){
    let output = ''
    for(let i = 0; i < args.length; ++i){
        output += ' ';
        let cur = args[i];
        if(cur instanceof Object){
            cur = JSON.stringify(args[i]);
        }
        if(i % 2){
            output += cur;
        } else{
            output += chalk.blue(`[${cur}]`)
        }
    }
    return output;
}

let actionLogger = {
    info(...args){
        // ...arguments
        console.log(chalk.green('[INFO]'), generateOutput(...args));
    },
    warn(...args){
        console.log(chalk.yellow('[WARN]'), generateOutput(...args));
    },
    error(...args){
        console.log(chalk.red('[ERROR]'), generateOutput(...args));
    }
}

export {actionLogger};