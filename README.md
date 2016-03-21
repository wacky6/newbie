Newbie
===
My (Wacky) Website!

Github repository is a mirror, production repository is hosted on a private server!

Repository contains:

* Site Generator
* HTTP Server Configuration
* Blog Content

This is a bad idea in terms of software engineering, but it works for a lazy guy like me.  
**DON'T DO THIS! UNLESS YOU KNOW WHAT YOU ARE DOING**

The website is designed for VPS or Container, not Github Pages.



## How to use
You need `node >= 5.0.0`

then `npm install`  
then `grunt deploy`  
then `node server`  


## Contrib.
Suggestions are welcomed, please open new issues or send an email.  
You are welcomed to derive from my stylus.

Old browsers won't be supported:

* All IE (Except Edge)
* Chrome/Chromium < 45
* Safari < 7
* Firefox < 40
* Android Browser < 4.3

There browsers, regardless of how advanced, are never supported, and may get blacklisted in the future:

* OEM Chrome/Chromium (Baidu, QQ, 360, Sogou, etc.)
* App embedded browser, except WeChat

To base your website upon my work, `git clone` then clean up `blog/` and `page/` folder.   
After that, re-initialize the repository(`rm -rf .git/ && git init`) then modify `package.json`.



## LICENSE
Generator(Incl. stylus, js): [CC-BY-NC-SA-4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)  
Content(Incl. articles, images):  [CC-BY-NC-ND-4.0](http://creativecommons.org/licenses/by-nc-nd/4.0/)
