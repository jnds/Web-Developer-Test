'use strict';

var gutil = require('gulp-util');

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var imagemin = require('gulp-imagemin');

// JS paths
var jsFiles = 'dev/js/**/*.js',
	jsLib = 'dev/js/libs/*.js',
	jsApp = 'dev/js/app/*.js',
	jsDest = 'library/js';

// CSS paths
var scssFiles = 'dev/scss/**/*.scss',
	cssDest = 'library/css';

// Image paths
var imgFiles = 'dev/images/**/*',
	imgDest = 'library/images';

// Watch .scss files
gulp.task('sass', function() {
	return gulp.src(scssFiles)
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(sourcemaps.init())
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(cssDest));
});

// Concatenate and uglify JS
gulp.task('scripts', function() {  
	return gulp.src([
		jsLib,
		jsApp,
		'dev/js/scripts.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest(jsDest))
	.pipe(rename('scripts.min.js'))
	.pipe(uglify())
	.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
	.pipe(gulp.dest(jsDest));
});

// Minify Images
gulp.task('images', function() {  
	return gulp.src(imgFiles)
	.pipe(imagemin([
		imagemin.svgo({plugins: [{removeViewBox: false}]})
	]))
	.pipe(gulp.dest(imgDest));
});

// Cleanup image directory
gulp.task('clean-img', function (cb) {
	return del(imgDest,cb);
});

// Watch and compile CSS and JS
gulp.task('watch', function() {
	// compile CSS
	gulp.watch(scssFiles, ['sass']);
	// compile JS
	gulp.watch(jsFiles, function(event){
		gulp.run('scripts');
	});
});

// Build task 
gulp.task('build', ['sass', 'scripts', 'images']);  

// Default task 
gulp.task('default', ['build']);  



