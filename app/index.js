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

    this.log( chalk.magenta( 'You\'re using the fantastic App generator.' ));

    var prompts = [
        {
            type: 'input',
            name: 'appName',
            message: 'What is the name of your app?',
            default: path.basename( process.cwd() )
        },
        {
            type: 'number',
            name: 'serverPort',
            message: 'What should the dev server port be?',
            default: 9002
        }
    ];

    this.prompt(prompts, function ( answers ) {
        this.appName = answers.appName;
        this.serverPort = answers.serverPort;
    }.bind(this));
  },

  configuring: function(){

      this.mkdir('dist');
      this.mkdir('src');

      // server-side
      this.mkdir('src/server'); // app libs
      this.mkdir('src/server/lib'); // app libs
      this.mkdir('src/server/lib/vendor'); // third party app libs
      this.mkdir('src/server/views'); // express views
      this.mkdir('src/server/routes'); // server-side routes

      // client-side
      this.mkdir('src/client');
      this.mkdir('src/client/lib');
      this.mkdir('src/client/lib/vendor');
      this.mkdir('src/client/layouts');
      this.mkdir('src/client/css');
      this.mkdir('src/client/js');

      // tests
      this.mkdir('test');
      this.mkdir('test/server');
      this.mkdir('test/client');

  },

  writing: function(){

      this.template('_README.md', 'README.md');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_gulpfile.js', 'gulpfile.js');

      this.copy('jshintrc', '.jshintrc');
      this.copy('_app.js', 'src/app.js');

      this.copy('favicon.ico', 'src/client/favicon.ico');
      this.copy('main.js', 'src/client/main.js');
      this.copy('_index.html', 'src/client/index.html');

  },

  install: function(){
      this.npmInstall();
      this.bowerInstall();
  },

  end : function(){
      this.log( chalk.magenta( 'Have a good day.' ));
  }

});
