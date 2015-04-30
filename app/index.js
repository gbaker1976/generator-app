'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var inflection = require('inflection');


var AppGenerator = yeoman.generators.Base.extend({

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
        },
        {
            type: 'confirm',
            name: 'hasStyleguide',
            message: 'Do you need a local styleguide server?',
            default: true
        },
        {
            type: 'number',
            name: 'styleguidePort',
            message: 'What should the styleguide server port be?',
            default: 3003
        }
    ];

    this.prompt(prompts, function ( answers ) {
        this.appName = answers.appName;
        this.serverPort = answers.serverPort;

        if ( answers.hasStyleguide ) {
            this.hasStyleguide = answers.hasStyleguide;
            this.styleguidePort = answers.styleguidePort;
        }
    }.bind(this));
  },

  writing: {

      directories: function(){
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

      files: function(){
          this.template('_README.md', 'README.md');
          this.template('_package.json', 'package.json');
          this.template('_gulpfile.js', 'gulpfile.js');

          this.copy('jshintrc', '.jshintrc');
          this.copy('_app.js', 'src/app.js');

          this.copy('favicon.ico', 'src/favicon.ico');
      },

      bower: function(){
          var bower = {
            name: this._.slugify( this.appName ),
            private: true,
            dependencies: {}
          };

          bower.dependencies.almond = "jburke/almond~0.3.1";

          this.copy( 'bowerrc', '.bowerrc' );
          this.write( 'bower.json', JSON.stringify( bower, null, 2 ) );
      }
  },

  install: function(){
      if (!this.options['skip-install']) {
          this.installDependencies();
      }
  },

  end : function(){
      this.log( chalk.magenta( 'Have a good day.' ));
  }

});

module.exports = AppGenerator;
