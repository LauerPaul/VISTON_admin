import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import VueWait from 'vue-wait'
// import jsonp from 'axios-jsonp-pro'
// import jsonpAdapter from 'axios-jsonp'
import 'babel-polyfill'
import Vuetify from 'vuetify'
import BootstrapVue from 'bootstrap-vue'
import querystring from 'querystring'
import VueLogger from 'vuejs-logger'

import layout from '@/layouts/default'
import store from '@/store'
import router from '@/router'

import random from '@/plugins/random'
import auth from '@/plugins/auth'
import site from '@/plugins/site'
import notify from '@/plugins/notify'
import logger from '@/plugins/logger'
import access from '@/plugins/access'
import sound from '@/plugins/sound'
import dictionary from '@/plugins/dictionary'

import VueProgressBar from 'vue-progressbar'
import transliteration from '@/plugins/transliteration'
import VueLoggerOptions from "@/plugins/logger_options.js"

 
Vue.config.productionTip = false

Vue.use(VueLogger, VueLoggerOptions)
Vue.use(VueRouter)
Vue.use(VueWait)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)
Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        blue: '#1c3439'
    }
})
Vue.use(BootstrapVue);
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})
Vue.use(transliteration)
Vue.use(dictionary)
Vue.use(random)
Vue.use(store)
Vue.use(site)
Vue.use(auth)
Vue.use(notify)
Vue.use(logger)
Vue.use(access)
Vue.use(sound)

import '@/middleware/access'
// -------------------
// Axios settings
// -------------------
axios.defaults.baseURL = 'https://viston.lauer.agency/admin/ajax'; // base url
// axios.defaults.headers.common['X-CSRF-TOKEN'] = 'Bearer ' + '0000';      // Токен

// -------------------
// --- vue layout init
// -------------------
var vm = new Vue({
    router,
    store,
    el: '#app-wrapper',
    data: {
        domain: 'https://viston.lauer.agency',
        querystring,
    },
    wait: new VueWait({
        useVuex: true, // You must pass this option `true` to use Vuex
        vuexModuleName: 'wait', // It's optional, `wait` by default.
        registerComponent: true,     // Registers `v-wait` component
        componentName: 'v-wait',     // <v-wait> component name, you can set `my-loader` etc.
        registerDirective: true,     // Registers `v-wait` directive
        directiveName: 'wait',       // <span v-wait /> directive name, you can set `my-loader` etc.
    }),
    render: h => h(layout),
})