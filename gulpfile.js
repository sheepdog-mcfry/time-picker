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
var rename = require('gulp-rename');
var gulpHandlebars = require('gulp-compile-handlebars');

gulp.task('partials', function() {
  options = {
    ignorePartials: true,
    batch : ['./src/handlebars/partials'],
  }
  gulp.src(['src/handlebars/_index.hbs'])
    .pipe(gulpHandlebars({}, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('src/tmp/'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(gulp.dest('src/tmp/css'));
});

gulp.task('compress', function() {
  gulp.src("src/scripts/**.*")
    .pipe(gulp.dest('src/tmp/scripts'));
  return gulp.src(['src/tmp/*.html'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('deleteTemp', function () {
    return gulp.src('src/tmp/')
        .pipe(clean({force: true}))
});

gulp.task('build', ['sass', 'partials', 'compress']);
