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

        done();
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
      this.mkdir('src/client/css');
      this.mkdir('src/client/js');
      this.mkdir('src/client/jsx');

      // tests
      this.mkdir('test');
      this.mkdir('test/server');
      this.mkdir('test/client');

  },

  writing: function(){

      this.template('_README.md', 'README.md');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_bowerrc', '.bowerrc');
      this.template('_gulpfile.js', 'gulpfile.js');
      this.template('_example.jsx', 'src/client/jsx/example.jsx');

      this.copy('jshintrc', '.jshintrc');
      this.copy('_app.js', 'src/app.js');

      this.copy('client/favicon.ico', 'src/client/favicon.ico');
      this.copy('client/app.js', 'src/client/app.js');
      this.copy('client/_index.html', 'src/client/index.html');

  },

  install: function(){
      var self = this;

      this.npmInstall( null, null, function(){
        self.bowerInstall();
      });
  },

  end: function(){
      this.log( chalk.magenta( 'Have a good day.' ));
  }

});
