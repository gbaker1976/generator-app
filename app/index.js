'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AppGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('You\'re using the fantastic App generator.'));

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {

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

    // tests
    this.mkdir('test');
    this.mkdir('test/server');
    this.mkdir('test/client');
  },

  projectfiles: function () {
    this.copy('jshintrc', '.jshintrc');

    // main server-side app
    this.copy('_app.js', 'src/app.js');

    this.template('_README.md', 'README.md');
    this.template('_package.json', 'package.json');
    this.template('_bowerrc', '.bowerrc');
    this.template('_bower.json', 'bower.json');
  }
});

module.exports = AppGenerator;
