'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var inflection = require('inflection');


module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require( '../package.json' );
  },

  prompting: function () {
    var done = this.async();
    var self = this;

    this.log( chalk.magenta( 'Let\'s generate an app!' ));

    var prompts = [
        {
            type: 'input',
            name: 'appName',
            message: 'What is the name of your app?',
            default: path.basename( process.cwd() )
        }
    ];

    this.prompt(prompts, function ( answers ) {
        this.appName = answers.appName;
        this.serverPort = answers.serverPort;

        done();
    }.bind(this));
  },

  configuring: function(){

      this.mkdir('dist');
      this.mkdir('src');

      // server-side
      this.mkdir('src/server'); // app libs
      this.mkdir('src/server/views'); // express views
      this.mkdir('src/server/routes'); // server-side routes

      // client-side
      this.mkdir('src/app');
      this.mkdir('src/app/css');
      this.mkdir('src/app/jsx');

      // tests
      this.mkdir('test');
      this.mkdir('test/server');
      this.mkdir('test/client');

  },

  writing: function(){

      this.template('_README.md', 'README.md');
      this.template('_package.json', 'package.json');
      this.template('_gulpfile.js', 'gulpfile.js');
      this.template('app/_example.jsx', 'src/app/jsx/example.jsx');

      this.copy('jshintrc', '.jshintrc');
      this.copy('_server.js', 'src/server.js');

      this.copy('app/favicon.ico', 'src/app/favicon.ico');
      this.copy('app/main.js', 'src/app/main.js');
      this.copy('app/_index.html', 'src/app/index.html');

  },

  install: function(){
      this.npmInstall();
  },

  end: function(){
      this.log( chalk.magenta( 'Have a good day.' ));
  }

});
