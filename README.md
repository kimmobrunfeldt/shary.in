# [shary.in](https://shary.in)

Mobile pastebin for images. After upload, you'll be redirected to a nice and short url which contains your image. Nothing more.

## Development

Stuff for developers

### Install

Shary is built on https://github.com/DaftMonk/generator-angular-fullstack
There might be references to angular specific things even though Shary nothing implemented with Angular.
Mainly the stack was chosen just to get express app quickly up.

Frontend is very basic HTML+JS+CSS, no fancy SASS etc.

**Dependencies**

* MongoDB
* nodejs
* npm
* bower `npm install -g bower`
* grunt `npm install -g grunt-cli`


When you have dependencies installed, run following commands in project root:

    npm install
    bower install

### Deployment

Shary is deployed to Heroku. All files are stored to Heroku's **temporary** file system. **This is a known risk.**
Since this service is just about temporary files, so what if they get deleted on every reboot?

You need mongodb in Heroku. I use: https://devcenter.heroku.com/articles/mongolab


**At least for now, the built code is stored on git which is not good.**

You need to

    grunt build

and commit dist directory and push it to Heroku.

### Get started

First install dependencies.

Run local server

    grunt serve
