#! /usr/bin/env node 
//Above line is to tell that this file needs to be interpreted in the node env
import fetch from 'node-fetch';
import open from 'open';
import chalk from 'chalk';
import { program } from 'commander';

// const {argv} = yargs(process.argv.slice(2));


const options = program.opts();

program
    .version('1.0.0')
    .description('Reddit-CLI')

program 
    .command('homepost')
    .alias('hp')
    .description('Generate a random post from home section of reddit')
    .action(()=>{
        homepost();
    })

program 
    .command('top')
    .alias('t')
    .description('Generate a random post from top section of reddit')
    .action(()=>{
        top();
    })

program
    .option('--print, --p','print the post link and title in console')

program.parse(process.argv);
// yargs.usage('Usage: $0 <command> [OPTIONS]')
// yargs.help('h')
// yargs.alias('h','help').argv
// const argv =  yargs
// .command({
//     "command":'homepost',
//     "describe":"fetching homepost",
//     handler:
//     (argv)=>{
//         homepost();
//     }
// }).argv

// if(argv.top || argv.t){
//     top();
// }
// else if(argv.homepost || argv.hp){
//     homepost();
// }
// else if(argv.help || argv.h){
//     printHelp("",true)
// }
// else{
//     printHelp("Incorrect Usage",true)
// }

async function top(){
    try {
        const res = await fetch("https://reddit.com/.json")
        const data = await res.json();
        const children = data.data.children;
        const randompost = children[Math.floor(Math.random()*children.length)];
        const link = `https://reddit.com${randompost.data.permalink}`;
        if(options.print){
        onlyprint(randompost.data.title,link);
        }
        else{
            open(link);
        }
    } catch (error) {
        var e = chalk.red("Couldnt fetch the requested url")
        console.log(e);
    }
}

async function homepost(){
    try {
        const res=await fetch("https://www.reddit.com/.json");
        const data = await res.json()
        const children = data.data.children;
        const randompost = children[Math.floor(Math.random()*children.length)]
        const link = `https://reddit.com${randompost.data.permalink}`
        if(options.print){
            onlyprint(randompost.data.title,link);
        }
        else{
            open(link);
        }
    } catch (error) {
        var e = chalk.red("Couldnt fetch the requested url")
        console.log(e);
    }
}
    
// function printHelp(msg,includeHelp=false){
//     console.error(chalk.red(msg));
//     if(includeHelp){
//         console.log("");
//         console.log(chalk.cyan("reddit usage:"));
//         console.log("");
//         console.log(chalk.green("   reddit --[COMMAND] --[OPTIONS]"));
//         console.log("");
//         console.log(chalk.grey("   reddit --help or --h"));
//         console.log("");
//         console.log(chalk.gray("   reddit -homepost or --hp"));
//         console.log("");
//         console.log(chalk.gray("   reddit --top or --t"));
//         console.log("");
//         console.log(chalk.blue("   OPTIONS include --print"));
//     }
// }


function onlyprint(title ,link){
    let ctitle = chalk.yellow(title)
    let clink = chalk.green(link)
    console.log(`
    title:${ctitle}
    link:${clink}
    `);
}