import fs from  'fs'
import gulp    from 'gulp'
import webpack from 'webpack'
import notify from 'gulp-notify'
import log from 'gutil-color-log'
import Browser from 'browser-sync'
import proxyMiddleware from 'http-proxy-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import modRewrite from 'connect-modrewrite'

import { config as webpackConfig } from './webpack'

import { pug_compile as html }  from './pug'
import { css_compile as css }  from './scss'
import { css_compile_min as css_min }  from './scss'
import { img_export as images }  from './image'
import { fonts_export as fonts }  from './fonts'

const paths_ = JSON.parse(fs.readFileSync('./paths.json'));
const cnf = JSON.parse(fs.readFileSync('./config.json'));
const browser = Browser.create()
const bundler = webpack(webpackConfig)

export function server(cb) {
    let config = {
        server: {
            baseDir: paths_.dist,
            // index: 'index.html',
            browser : 'google chrome',
            middleware: [
                webpackDevMiddleware(bundler, webpackConfig),
                webpackHotMiddleware(bundler),
                modRewrite([
                    '!^/js|css|img|images|icons|static|fonts|sound|locales/ /index.html [L]'
                ]),
                proxyMiddleware('/api', {
                    target: 'http://localhost:8888'
                }),
                proxyMiddleware('/auth', {
                    target: 'http://localhost:8888'
                })
            ]
        }
    }
    browser.init(config)

    /* Vue */
    gulp.watch(paths_.app + '/vue/app.js')
    .on('change', function(path, stats) {
        log('green', path); 
        browser.reload({ stream: true });
    }).on('unlink', function(path, stats) {log('green', path);});

    /* Pug */
    if(cnf.pug.watch) {
        gulp.watch(paths_.app + paths_.pug.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [pug]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            notify("[PUG] - Watch start...");
            html(browser);
        }).on('unlink', function(path, stats) {log('green', path);});
    }

    /* Scss */
    if(cnf.scss.watch) {
        gulp.watch(paths_.app + paths_.scss.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [scss]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            notify("[SCSS] - Watch start...");
            if(cnf.scss.min) css_min();
            css(browser);
        }).on('unlink', function(path, stats) {log('green', path);});
    }


    /* Images */
    if(cnf.img.watch) {
        gulp.watch(paths_.app + paths_.img.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [images]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            notify("[IMAGES] - Watch start...");
            images(browser);
        }).on('unlink', function(path, stats) {log('green', path);});
    }


    /* Fonts */
    if(cnf.fonts.watch) {
        gulp.watch(paths_.app + paths_.fonts.watch, { passthrough: true, deep: true })
        .on('change', function(path, stats) {
            console.log(' ');
            console.log('-----------------------------------------------------------------------------------');
            log('green', '->>>>>>> ✅ Watch [fonts]: ' + path);
            console.log('-----------------------------------------------------------------------------------');
            notify("[FONTS] - Watch start...");
            fonts(browser);
        }).on('unlink', function(path, stats) {log('green', path);});
    }


    if(typeof(cb) == 'function') cb();
}
