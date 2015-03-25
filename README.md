## Tamland the weatherman

A vanilla javascript app, build on top of a 50 lines of code mini-framework called Entangular, which allows creating components and services, and sharing them amongst eachother through a mini DI mechanism. 

The styling of the app is an attempt to use some Google Material Design principles without any UX frameworks.

## A few notes on the Dev Env

The dev environment is fairly complex, as it's been scaffolded using a [yeoman generatora](https://github.com/kosz/generator-modular) that I wrote to speed up my angular development process. While the generator is aimed at angular apps, I was able to strip down angular from it, and use only vanilla javascript, while leveraging it's many automation and dev environment features, such as the browserSync development server and automatic injection and compilation of assets into the html.  

The [modular generator](https://github.com/kosz/generator-modular), is wired up to provide an asset pipeline which can support the [Google Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1). Taking advantage of this, you will find the javascript asset files next to relevant scss files organized in a feature based folder structure. There are no templates/partials since only vanilla js was allowed and there wasn't enough time to rebuild angular template cache.  

## Installation

In order to run the app, the development environment must be installed. This is a breeze under a node.js enabled development environment. The requirements are : yeoman, gulp, node.js, git, bower. With those installed the next steps would be: 

- git clone this repo
- cd into the project root directory 
- run ```npm install && bower install```
- run ```gulp serve``` to start the app server. The SPA should automatically load itself onto a browser window. 

If things go well, the page should look like this : 

![Large Screen]()
![Medium Screen]()
![Small Screen]()

