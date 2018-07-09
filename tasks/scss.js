import fs from  'fs'
import gulp from 'gulp'
import if_ from 'gulp-if'
import sass from 'gulp-sass'
import notify from 'gulp-notify'
import rename from 'gulp-rename'
import plumber from 'gulp-plumber'
import changed from 'gulp-changed'
import filesize from 'gulp-filesize'
import prefix from 'gulp-autoprefixer'
import browserSync from 'browser-sync'
import sourcemaps from 'gulp-sourcemaps'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'));
const cnf = JSON.parse(fs.readFileSync('./config.json'));

export function css_compile_min(){
	return gulp.src(paths_.app + paths_.scss.path)
                .pipe(plumber())
                .pipe(changed(paths_.dist + paths_.scss.out))
                .pipe(sass({
                    outputStyle: 'compressed',
                    precison: 3,
                    errLogToConsole: true
                }).on('error', sass.logError))
                .pipe(prefix())
                .pipe(rename({
                	suffix: '.min'
                }))
                .pipe(plumber.stop())
                .pipe(gulp.dest(paths_.dist + paths_.scss.out))
                .pipe(filesize())
}

export function css_compile (browserS){
	gulp.src(paths_.app + paths_.scss.path)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(changed(paths_.dist + paths_.scss.out))
        .pipe(if_(cnf.scss.sourceMap, sourcemaps.init({loadMaps: true})))
        .pipe(sass({
                outputStyle: 'nested',
                precison: 3,
                errLogToConsole: true

        }).on('error', sass.logError))
        .pipe(prefix())
        .pipe(if_(cnf.scss.sourceMap, sourcemaps.write(paths_.scss.sourceMap)))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths_.dist + paths_.scss.out))
        .pipe(filesize())
        .pipe(browserS.reload({ stream: true }));
}

/** SCSS min */
export function styles(cb) {
    if(cnf.scss.min) css_compile_min();
    css_compile(browserSync);
    if(typeof(cb) == 'function') cb();
}