var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

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
  return gulp.src(['src/handlebars/_index.hbs'])
    .pipe(gulpHandlebars({}, {
      ignorePartials: true,
      batch : ['./src/handlebars/partials'],
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('src/tmp/'));
});

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/tmp/css'));
});

gulp.task('images', function() {
  return gulp.src('src/img/**.*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('scripts', function(){
  return gulp.src("src/scripts/**.*")
    .pipe(gulp.dest('src/tmp/scripts'));
});

gulp.task('compress', function() {
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

gulp.task('build', gulp.series('sass', 'partials', 'images', 'scripts', 'compress'));
