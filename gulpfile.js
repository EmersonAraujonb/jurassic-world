const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imageMin = require('gulp-imagemin');
const newer = require('gulp-newer');

function otimizaImagens() {
    return gulp.src('src/images/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./dist/images'));
}

function comprimeJavaScript() {
    return gulp.src('src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
}

function compilaSass() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/css'));
}

function html() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))
}

function videos() {
    return gulp.src('./src/videos/**/*')
        .pipe(newer('./dist/videos'))
        .pipe(gulp.dest('./dist/videos'));
}

exports.default = gulp.series(
    html,
    videos,
    gulp.parallel(
        compilaSass,
        comprimeJavaScript,
        otimizaImagens
    )
);