// Include gulp
var gulp = require('gulp'); 
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ng-annotate');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-clean-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');

var paths = {
  scripts: [ 'app/**/*.js', '!app/bower_components/**/*.js' ],
  html: [
    './app/**/*.html',
    '!./app/index.html',
    '!./app/bower_components/**/*.html'
  ],
  index: './app/index.html',
  build: './build/'
}
/* 1 */
gulp.task('clean', function(){
  gulp.src( paths.build, { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src( paths.html )
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ))
});

gulp.task('build', ['usemin']);

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
      .pipe(connect.reload());
  gulp.src('./app/**/*.js')
      .pipe(connect.reload());
  gulp.src('./app/**/*.css')
      .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html', './app/**/*.css', './app/**/*.js'], ['html']);
});

gulp.task('default', ['connect', 'watch']);

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'app/',
    livereload: true
  });
});
gulp.task('default', ['connect', 'watch']);
