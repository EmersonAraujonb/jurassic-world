const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

function otimizaImagens() {
    return gulp.src('src/images/**/*.{jpg,jpeg,png,gif,svg,webp}')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo()
        ]))
        .pipe(imagemin())
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