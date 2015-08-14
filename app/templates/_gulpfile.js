var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var cssnext = require( 'gulp-cssnext' );
var fs = require( 'fs' );
var wrench = require( 'wrench' );
var webpack = require( 'webpack' );
var react = require( 'gulp-react' );
var WebpackDevServer = require( 'webpack-dev-server' );

gulp.task( 'css-dev', function(){
	return gulp.src( 'src/app/css/_all.css' )
		.pipe( cssnext({
			compress: false
		}))
		.pipe( postcss( [ postcssNested ] ) )
		.pipe( gulp.dest( 'dist/app/css' ) )
});

gulp.task( 'css-prod', function(){
	return gulp.src( 'src/app/css/_all.css' )
		.pipe( cssnext() )
		.pipe( postcss( [ postcssNested ] ) )
		.pipe( gulp.dest( 'dist/app/css' ) )
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
		return gulp.src( 'src/app/index.html' )
			.pipe( gulp.dest( 'dist/app' ) );
	}
);

gulp.task( 'react', function () {
    return gulp.src('src/app/jsx/**/*.jsx')
			.pipe( react() )
			.pipe( gulp.dest( 'src/app/jsx' ));
});

gulp.task( 'webpack', function( callback ) {
    // run webpack
    webpack({

			context: __dirname + '/src/app',
			entry: './main',
			output: {
				path: __dirname + '/dist/app',
				filename: 'main.js'
			},
			resolve: {
				root: [
					__dirname + '/src/app/jsx'
				]
			}

		}, function( err, stats ) {
        if ( err ) throw new gutil.PluginError( 'webpack', err );
        console.log( '[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task( 'webpack-dev-server', function( callback ) {
    // Start a webpack-dev-server
		var compiler = webpack({

			context: __dirname + '/src/app',
			entry: './main',
			output: {
				path: __dirname + '/dist/app',
				filename: 'main.js'
			},
			resolve: {
				root: [
					__dirname + '/src/app/jsx'
				]
			}

		});

    new WebpackDevServer( compiler, {
			contentBase: "dist/app"
    }).listen( 8080, 'localhost', function( err ) {
        if( err ) throw new gutil.PluginError( 'webpack-dev-server', err );
        // Server listening
        console.log( '[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html' );

        // keep the server alive or continue?
        // callback();
    });
});


gulp.task( 'default', [ 'clean-dist', 'css-dev', 'copy-html', 'react', 'webpack-dev-server' ] );
