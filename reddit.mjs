#! /usr/bin/env node 
//Above line is to tell that this file needs to be interpreted in the node env
import fetch from 'node-fetch';
import open from 'open';
import chalk from 'chalk';
import { program } from 'commander';

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
    .command(`search <value> <type>`)
    .alias('s')
    .description('Search on reddit')
    .description('<type> : post --> to search only post')
    .description('<type> : comu --> to search only communities')
    .action((string,type)=>{
        search(string,type);
    })

program
    .option('--print, --p','print the post link and title in console')

program.parse(process.argv);

export async function top(){
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

export async function homepost(){
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

export async function newpost(){
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

export async function rising(){
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

export function search(string,type){
    try {
        if(type === 'post')
            open(`https://www.reddit.com/search/?q=${string}&type=link`)
        else if(type === 'comu')
            open(`https://www.reddit.com/search/?q=${string}&type=sr%2Curser`);
        else
            open(`https://reddit.com/search/?q=${string}`);
    } catch (error) {
        var e = chalk.red("Couldnt fetch the requested url")
        console.log(e);
    }
}

export function onlyprint(title ,link){
    let ctitle = chalk.yellow(title)
    let clink = chalk.green(link)
    console.log(`
    title:${ctitle}
    link:${clink}
    `);
}