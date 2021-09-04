#! /usr/bin/env node 
//Above line is to tell that this file needs to be interpreted in the node env
import fetch from 'node-fetch';
import open from 'open';
import yargs from 'yargs'
import chalk from'chalk';


const {argv} = yargs(process.argv);

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

if(argv.top){
    top();
}
else{
    homepost();
}

async function top(){
    try {
        const res = await fetch("https://reddit.com/.json")
        const data = await res.json();
        const children = data.data.children;
        const randompost = children[Math.floor(Math.random()*children.length)];
        const link = `https://reddit.com${randompost.data.permalink}`;
        if(argv.print){
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
        if(argv.print){
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
    

function onlyprint(title ,link){
    let ctitle = chalk.yellow(title)
    let clink = chalk.green(link)
    console.log(`
    title:${ctitle}
    link:${clink}
    `);
}