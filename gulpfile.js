var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var size = require('gulp-size');

var files = ['./src/index.js']

gulp.task('default', ['build'])

gulp.task('build', function () {
  gulp.src(files)
    .pipe(concat('simplemde-angular.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({unsafe: true, global_defs: { DEBUG: false }}))
    .pipe(rename('simplemde-angular.min.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(size({showFiles: true}));
});
