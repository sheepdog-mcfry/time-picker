var gulp = require('gulp');

//for minifying
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var sass = require('gulp-sass');

//for deleting temp files
var clean = require('gulp-clean');

//for handlebars
var handlebars = require('handlebars');
var rename = require('gulp-rename');
var gulpHandlebars = require('gulp-compile-handlebars');

gulp.task('partials', function() {
  options = {
    batch : ['src/handlebars/partials'],
  }
  gulp.src(['src/handlebars/partials/_index.hbs'])
    .pipe(gulpHandlebars(options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('src/tmp/html/'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/tmp/css'));
});

gulp.task('compress', function() {
  return gulp.src(['src/tmp/html/*.html'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('deleteTemp', function () {
    return gulp.src('src/tmp/')
        .pipe(clean({force: true}))
});

gulp.task('build', ['partials', 'sass', 'compress', 'deleteTemp']);
