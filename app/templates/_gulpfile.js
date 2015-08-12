var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var cssnext = require( 'gulp-cssnext' );
var fs = require( 'fs' );
var wrench = require( 'wrench' );
var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );


gulp.task( 'css-dev', function(){
	return gulp.src( 'src/client/css/_all.css' )
	.pipe( cssnext({
		compress: false
	}))
	.pipe( postcss( [ postcssNested ] ) )
	.pipe( gulp.dest( 'dist/client/css' ) )
});

gulp.task( 'css-prod', function(){
	return gulp.src( 'src/client/css/_all.css' )
	.pipe( cssnext() )
	.pipe( postcss( [ postcssNested ] ) )
	.pipe( gulp.dest( 'dist/client/css' ) )
});

gulp.task( 'app-js', function(){
	return gulp.src( 'src/client/js/**/*.js' )
	.pipe( gulp.dest( 'dist/client/js' ) );
});

gulp.task(
	'clean-dist',
	function( cb ) {
		fs.exists( 'dist', function( exists ){
			if ( exists ) {
				wrench.rmdirSyncRecursive( 'dist' );
			}
			fs.mkdir( 'dist', cb );
		});
	}
);

gulp.task(
	'copy-html',
	function ( cb ) {
		wrench.copyDirRecursive( 'src/client/layouts', 'dist/client/layouts', { forceDelete: true }, cb );
	}
);

gulp.task( 'webpack', function( callback ) {
    // run webpack
    webpack({
			context: __dirname + '/src/client',
			entry: './app',
			output: {
				path: __dirname + '/dist/client',
				filename: 'app.js'
			}
    }, function( err, stats ) {
        if ( err ) throw new gutil.PluginError( 'webpack', err );
        gutil.log( '[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task( 'webpack-dev-server', function( callback ) {
    // Start a webpack-dev-server
		var compiler = webpack({
			contentBase: __dirname + '/dist/client'
    });

    new WebpackDevServer( compiler, {
        // server and middleware options
    }).listen( 8080, 'localhost', function( err ) {
        if( err ) throw new gutil.PluginError( 'webpack-dev-server', err );
        // Server listening
        gutil.log( '[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html' );

        // keep the server alive or continue?
        // callback();
    });
});


gulp.task( 'default', [ 'clean-dist', 'css-dev', 'app-js', 'copy-html', 'webpack', 'webpack-dev-server' ] );
//gulp.task( 'package', [ 'clean-dist', 'css-prod', 'app-js', 'serve-app' ] );
