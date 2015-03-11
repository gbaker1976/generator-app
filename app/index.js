'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var inflection = require('inflection');


var AppGenerator = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    var self = this;

    self.apiMembers = [];

    this.log( chalk.magenta( 'You\'re using the fantastic App generator.' ));

    var prompts = [
        {
            type: 'input',
            name: 'appName',
            message: 'What is the name of your app?',
            default: path.basename( process.cwd() )
        },
        {
            type: 'confirm',
            name: 'hasRest',
            message: 'Do you need a rest API mock?',
            default: true
        }
    ];

    var apiPrompts = [
        {
            type: "input",
            name: "memberPluralName",
            message: "What is the plural form for your API member?"
        },
        {
            type: "input",
            name: "memberSingularName",
            message: "What is the singular form for your API member?",
            default: function( answers ) {
                return inflection.singularize( answers.memberPluralName );
            }
        },
        {
            type: "confirm",
            name: "askAgain",
            message: "Want to enter another API member?",
            default: true
        }
    ];

    var ask = function( done ){
        self.prompt( apiPrompts, function ( answers ) {
            self.apiMembers.push({
                pluralName: answers.memberPluralName.toLowerCase(),
                singularName: answers.memberSingularName.toLowerCase()
            });

            if ( answers.askAgain ) {
                ask( done );
            } else {
                done();
            }
        }.bind(self));
    };

    this.prompt(prompts, function ( answers ) {
        this.appName = answers.appName;

        if ( answers.hasRest ) {
            this.hasRest = answers.hasRest;
            ask( done );
        }
    }.bind(this));
  },

  configuring: function () {

    this.mkdir('dist');
    this.mkdir('src');

    // server-side
    this.mkdir('src/server'); // app libs
    this.mkdir('src/server/lib'); // app libs
    this.mkdir('src/server/lib/vendor'); // third party app libs
    this.mkdir('src/server/views'); // express views
    this.mkdir('src/server/routes'); // server-side routes

    if ( this.hasRest ) {
        this.mkdir('src/server/rest'); // server-side routes
    }

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

    this.copy('jshintrc', '.jshintrc');

    this.template('_README.md', 'README.md');
    this.template('_package.json', 'package.json');
    this.template('_bowerrc', '.bowerrc');
    this.template('_bower.json', 'bower.json');
    this.template('_gulpfile.js', 'gulpfile.js');

  },

  writing: function () {
      // main server-side app
      this.copy('_app.js', 'src/app.js');

      if ( this.hasRest ) {
          this.template('_api.md', 'src/server/rest/api.md');
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
