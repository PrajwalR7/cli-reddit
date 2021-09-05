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
    .command('new')
    .alias('n')
    .description('Generate a random new reddit post')
    .action(()=>{
        newpost();
    })

program
    .command('rising')
    .alias('r')
    .description('Generate a random rising reddit post')
    .action(()=>{
        rising();
    })

program 
    .command(`search <string>`)
    .alias('s')
    .description('Search on reddit')
    .action(({string})=>{
        console.log(string);
        search({string});
    })

program
    .option('--print, --p','print the post link and title in console')

program.parse(process.argv);

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

async function newpost(){
    try {
        const res = await fetch("https://www.reddit.com/new/.json");
        const data = await res.json();
        const children = data.data.children;
        const randompost = children[Math.floor(Math.random()*children.length)];
        const link = `https://reddit.com${randompost.data.permalink}`;
        if(options.print){
            onlyprint(randompost.data.title,link)
        }
        else{
            open(link);
        }
    } catch (error) {
        var e = chalk.red("Couldnt fetch the requested url")
        console.log(e);
    }
}

async function rising(){
    try {
        const res = await fetch("https://www.reddit.com/rising/.json");
        const data = await res.json();
        const children = data.data.children;
        const randompost = children[Math.floor(Math.random()*children.length)];
        const link = `https://reddit.com${randompost.data.permalink}`;
        if(options.print){
            onlyprint(randompost.data.title,link)
        }
        else{
            open(link);
        }
    } catch (error) {
        var e = chalk.red("Couldnt fetch the requested url")
        console.log(e);
    }
}

async function search(string){
    try {
        //const searchelement = await string;
        console.log(string);
       await open(`https://reddit.com/search/?q=${string}`);
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