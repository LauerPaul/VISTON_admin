import gulp from 'gulp'

import { server }  from './server'
import { buildScript }  from './server'

import { clear }  from './del'
import { html }  from './pug'
import { styles }  from './scss'
import { img }  from './image'
import { fonts }  from './fonts'

export const dev   = gulp.series( server, gulp.parallel(html, img, fonts, styles) )
export const build = gulp.series( buildScript )

export default dev
