import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
const sass = gulpSass(dartSass);

export function otimizaImagens() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));
}

export function comprimeJavaScript() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
}

export function compilaSass() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('dist/css'));
}

export function html() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'));
}

export function videos() {
    return gulp.src('src/videos/**/*')
        .pipe(gulp.dest('dist/videos'));
}

export const build = gulp.parallel(
    html,
    videos,
    compilaSass,
    comprimeJavaScript,
    otimizaImagens
);

export function watch() {
    gulp.watch('src/styles/**/*.scss', compilaSass);
    gulp.watch('src/images/**/*', otimizaImagens);
    gulp.watch('src/scripts/**/*.js', comprimeJavaScript);
    gulp.watch('index.html', html);
    gulp.watch('src/videos/**/*', videos);
}

export default gulp.series(build, watch);