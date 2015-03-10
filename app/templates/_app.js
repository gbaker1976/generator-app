#!/usr/bin/env node

/**
 * @file the main entrypoint of the application
 */

'use strict';

var express = require( 'express' )
    , http = require( 'http' )
    , app = express()
    , hbs = require( 'hbs' )
    , pkg = require( './package.json' );
   

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

/**** END STANDARD ROUTE CONFIG ****/
try {
	var server = http.createServer( app )
	
	server.listen( 
			9002, 'localhost', function(){
	    		console.log( 'Express server listening on port %d in %s mode',  9002, process.env.NODE_ENV );
			}
		);
} catch ( ex ) {
	console.log( ex );
}
