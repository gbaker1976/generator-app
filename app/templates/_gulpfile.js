var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var cssnext = require( 'gulp-cssnext' );
var fs = require( 'fs' );
var wrench = require( 'wrench' );
var aglio = require( 'gulp-aglio' );
var browserSync = require( 'browser-sync' );
var ApiMock = require( 'api-mock' );

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

gulp.task( 'gen-api-docs', function() {
	return gulp.src( 'src/server/rest/*.md' )
		.pipe( aglio( { template: 'default' } ) )
		.pipe( gulp.dest( 'dist/server/rest' ) );
});

gulp.task( 'serve-app', function() {
	browserSync({
		server: {
			port: <%= serverPort %>,
			baseDir: 'dist'
		}
	});
});

gulp.task( 'serve-styleguide', function() {
	browserSync({
		server: {
			port: 3001,
			baseDir: 'dist/styleguide'
		}
	});
});

gulp.task ( 'serve-api-mock', function () {
    var mockserver = new ApiMock({
      blueprintPath: 'src/server/rest/api.md',
      options: {
        port: <%= mockPort %>
      }
    });

    mockServer.run();
});

gulp.task( 'default', [ 'clean-dist', 'css-dev', 'app-js', 'copy-html', 'serve-api-mock', 'serve-app', 'serve-styleguide' ] );
//gulp.task( 'package', [ 'clean-dist', 'css-prod', 'app-js', 'serve-app' ] );
