import fs from  'fs'
import gulp    from 'gulp'
import pug from 'gulp-pug'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync'
import gulpPugBeautify from 'gulp-pug-beautify'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'));

export function pug_compile (browserS){
	const beautify = gulpPugBeautify({omit_empty: true})
	const pug_ = pug({pretty: true})

	gulp.src(paths_.app + '/*.pug', { passthrough: true, deep: true })
	     .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	     .pipe(beautify.on('error', () => {console.log('->>> error beautify <<<-')}))
		 .pipe(pug_.on('error', console.log))
	     .pipe(plumber.stop())
		 .pipe(gulp.dest(paths_.dist))
	     .pipe(browserS.reload({ stream: true }));
}

export function html(cb) {
	pug_compile(browserSync);
    if(typeof(cb) == 'function') cb();
}