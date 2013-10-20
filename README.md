# Mental Health Liberia
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

## Vagrant
If you'd prefer to develop using [Vagrant](http://www.vagrantup.com) and [VirtualBox](https://www.virtualbox.org), we support that.

Make sure that the submodules in `/modules` are cloned before starting the machine.

Simply run:

```
$ vagrant up
$ vagrant ssh
```

Once in the machine, the PEF code is in `/vagrant`. Simply build and run the app server as before (see `How to Run`).

You can access the site at `0.0.0.0:4567` in your favorite web browser.

Note: Node.JS, bower, grunt, and other configured with thanks to appleYaks's [example repository](https://github.com/appleYaks/grunt-express-workflow).

## Group Members
* Ryan Ashcraft
* Tanner Smith
* John Dugan
* Alex Saterly
