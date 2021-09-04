#! /usr/bin/env node 
//Above line is to tell that this file needs to be interpreted in the node env
import fetch from 'node-fetch';
import open from 'open';
import yargs from 'yargs';

const {argv} = yargs(process.argv);

const res=await fetch("https://www.reddit.com/.json");
const data = await res.json()
const children = data.data.children;
const randompost = children[Math.floor(Math.random()*children.length)]
const link = `https://reddit.com${randompost.data.permalink}`

if(argv.print){
    console.log(`
    title:${randompost.data.title}
    link:${link}
    `);
}
else{
    open(link)
}