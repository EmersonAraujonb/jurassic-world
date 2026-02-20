const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imageMin = require('gulp-imagemin');

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

exports.default = gulp.series(
    html,
    gulp.parallel(
        compilaSass,
        comprimeJavaScript,
        otimizaImagens
    )
);