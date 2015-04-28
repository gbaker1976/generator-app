var gulp = require( 'gulp' );
var postcss = require( 'gulp-postcss' );
var postcssNested = require( 'postcss-nested' );
var cssnext = require( 'gulp-cssnext' );
var fs = require( 'fs' );
var wrench = require( 'wrench' );
var browserSync = require( 'browser-sync' );


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

gulp.task( 'serve-app', function() {
	browserSync({
		server: {
			port: <%= serverPort %>,
			baseDir: 'dist'
		}
	});
});


gulp.task( 'default', [ 'clean-dist', 'css-dev', 'app-js', 'copy-html', 'serve-app' ] );
//gulp.task( 'package', [ 'clean-dist', 'css-prod', 'app-js', 'serve-app' ] );
