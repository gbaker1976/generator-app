#!/usr/bin/env node

/**
 * @file the main entrypoint of the application
 */

'use strict';

var express = require( 'express' );
var http = require( 'http' );
var app = express();
var hbs = require( 'hbs' );
var proxy = require( 'http-proxy' );
var pkg = require( './package.json' );


// use handlebars templates for views
app.set( 'view engine', 'hbs' );
app.set( 'views', __dirname + '/templates' );
// static resources if not handled by route
app.use( express.static( __dirname ) );

/**** STANDARD ROUTE CONFIG ****/
// standard routes not handled by subsequent handlers
app.get( '/', function( req, res, next ){
	res.render( 'index' );
});

if ( 'development' === NODE_ENV ) {
    <% if ( hasRest ) { %>
    app.all( '/api/*', function( req, res ){
        proxy.createProxyServer().web( req, res, { target: 'http://localhost:<%= mockPort %>' });
    });
    <% } %>
}

/**** END STANDARD ROUTE CONFIG ****/
try {
	var server = http.createServer( app )

	server.listen(
			<%= serverPort %>, 'localhost', function(){
	    		console.log( '<%= appName %> server listening on port %d in %s mode', <%= serverPort %>, process.env.NODE_ENV );
			}
		);
} catch ( ex ) {
	console.log( ex );
}
