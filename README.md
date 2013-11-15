# Mental Health Liberia - Client
This is the client / web frontend for the Patient Encounter Form system. It relies on the [backend](https://github.com/Tanner/Mental-Health-Liberia-PEF-Server) to submit forms.

The web app is a static site which can be served on any static web server.

## Background
This project is a part of the Computing for Good class led by [Ellen Zegura](http://www.cc.gatech.edu/~ewz/Welcome.html) at the [Georgia Institute of Technology](http://www.gatech.edu).

## How to Run
This project requires that [node.js](http://nodejs.org), [grunt](http://gruntjs.com), [ruby](https://www.ruby-lang.org/en/), and [bower](http://bower.io) must be installed.

You can install grunt and bower by running:

```
$ npm install -g grunt-cli bower
```

Next, install the dependencies for the project (both node modules, gems, and CSS/JS):

```
$ npm install
$ bower install
$ bundle
```

Then build and run the project:

```
$ grunt build
$ grunt server
```

You're done! You can view the site at `0.0.0.0:9000` in your favorite web browser.

### Group Members
* Ryan Ashcraft
* Tanner Smith
* John Dugan
* Alex Satterly
* Melaena Roberts
