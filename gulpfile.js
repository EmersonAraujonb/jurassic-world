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

exports.default = function() {
    gulp.watch('./src/styles/**/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./src/scripts/*.js',  { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./src/images/**/*',  { ignoreInitial: false }, gulp.series(otimizaImagens));
    gulp.watch('./index.html',  { ignoreInitial: false }, gulp.series(html));
}

// exports.default = compilaSass;

// exports.watch = function() {
//     gulp.watch('src/styles/**/*.scss', compilaSass);
// }
// exports.javascript = comprimeJavaScript;
// exports.images = otimizaImagens;