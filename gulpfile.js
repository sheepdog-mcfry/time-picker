var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var useref = require('gulp-useref');
var sass = require('gulp-sass')

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('compress', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['sass', 'compress']);
