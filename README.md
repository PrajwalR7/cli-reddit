# CLI-Reddit
## How to install
### Install as package
```
npm install cli-reddit
```
### Install as CLI
```
npm install cli-reddit -g
```
## Importing
Import the entire package
```javascript
const reddit = require('cli-reddit')
```
Import only specific methods
```javascript
const { homepost, top } = require('cli-reddit')
```
Functionalities in this package are
* Homepost
* Top
* New
* Rising
* Search
All these methods are async(await) since they make web requests
## How to use as CLI
General usage
```
reddit [OPTIONS]
```
## Commands
```
reddit homepost
```
This command is used to view a random post in home section of reddit
```
reddit top
```
This command is used to view a random post in top section of reddit
```
reddit new
```
This command is used to view a random post in new section of reddit
```
reddit rising
```
This command is used to view a random post in rising section of reddit
```
reddit search <value>
```
This command intiates the search query against the value which you enter
```
reddit --help
```
To know more about commands enter the above command
This package makes use of common js module export and ES module export
## Package/App info
### Author
Prajwal R
