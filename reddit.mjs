#! /usr/bin/env node 
//Above line is to tell that this file needs to be interpreted in the node env
import fetch from 'node-fetch';
import open from 'open';
import yargs from 'yargs';

const {argv} = yargs(process.argv);

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
        console.log('Couldnt fetch the requested url');
    }
}

async function homepost(){
    try {
        const res=await fetch("https://www.reddit.com/.json");
        const data = await res.json()
    } catch (error) {
        const children = data.data.children;
        const randompost = children[Math.floor(Math.random()*children.length)]
        const link = `https://reddit.com${randompost.data.permalink}`
        if(argv.print){
            onlyprint(randompost.data.title,link);
        }
        else{
            open(link);
        }
    }
}
    

function onlyprint(title ,link){
    console.log(`
    title:${title}
    link:${link}
    `);
}
// if(argv.print){
//     console.log(`
//     title:${randompost.data.title}
//     link:${link}
//     `);
// }
// else{
//     open(link)
// }