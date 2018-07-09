import fs from  'fs'
import gulp    from 'gulp'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import cache from 'gulp-cache'
import browserSync from 'browser-sync'


const paths_ = JSON.parse(fs.readFileSync('./paths.json'));

export function img_export(browserS){
	return gulp.src(paths_.app + paths_.img.path)
		        .pipe(cache(imagemin({
		        	// optimizationLevel: 3,
		            progressive: true,
		            svgoPlugins: [{removeViewBox: false}],
		            use: [pngquant()],
		            interlaced: true
		        })))
		        .pipe(gulp.dest(paths_.dist + paths_.img.out))
	     		.pipe(browserS.reload({ stream: true }));
}

export function img(cb) {
	img_export(browserSync);
    if(typeof(cb) == 'function') cb();
}