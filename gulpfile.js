var gulp = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var coffeelint = require('gulp-coffeelint');
var size = require('gulp-size');
var reporter = require('coffeelint-stylish').reporter;

var files = ['./src/index.coffee']2

gulp.task('default', ['build'])

gulp.task('build', ['lint'], function () {
  gulp.src(files)
    .pipe(concat('simplemde-angular.coffee'))
    .pipe(gulp.dest('./dist/'))
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({unsafe: true, global_defs: { DEBUG: false }}))
    .pipe(rename('simplemde-angular.min.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(size({showFiles: true}));
});

gulp.task('lint', function () {
  gulp.src('./src/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter('coffeelint-stylish'))
});
