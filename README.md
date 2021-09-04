# reddit-cli
## How to install
First you need to run `npm install` to install the package dependencies
Along with installing the dependecies the `npm install` command will also setup your reddit cli onto your machine
## How to use
Once you have the reddit cli setup you can run the following commands
```
reddit [OPTIONS]
```
this command will automatically open your browser and fetch a random reddit post

```
reddit --[OPTIONS] --print
```
Running this command will log out the title and the link of a random reddit post

```
reddit --top 
```
Running this command will fetch a random post from reddit's top section, adding `--print` will do the same but doesnt open your browser
