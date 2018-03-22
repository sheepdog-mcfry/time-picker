var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var sass = require('gulp-sass')
var clean = require('gulp-clean')

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/tmp/css'));
});

gulp.task('compress', function() {
  return gulp.src(['src/*.html'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('deleteTemp', function () {
    return gulp.src('src/tmp/')
        .pipe(clean({force: true}))
});

gulp.task('build', ['sass', 'compress', 'deleteTemp']);
