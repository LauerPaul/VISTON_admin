import Vue from 'vue'
import '@/plugins/includes'

import transliteration from '@/plugins/transliteration'
import random from '@/plugins/random'
import site from '@/plugins/site'
import auth from '@/plugins/auth'
import notify from '@/plugins/notify'
import logger from '@/plugins/logger'
import access from '@/plugins/access'
import sound from '@/plugins/sound'

Vue.use(transliteration)
Vue.use(random)
Vue.use(site)
Vue.use(auth)
Vue.use(notify)
Vue.use(logger)
Vue.use(access)
Vue.use(sound)