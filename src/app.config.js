import 'babel-polyfill'
// ------------------------------------
import Vue from 'vue'
import VueRouter from 'vue-router'
// ------------------------------------
import axios from 'axios'
import VueAxios from 'vue-axios'
// import jsonp from 'axios-jsonp-pro'
// import jsonpAdapter from 'axios-jsonp'
// ------------------------------------
import Vuex from 'vuex'
import VueWait from 'vue-wait'
// ------------------------------------
// ----------*** Import ***------------
// ------------------------------------
import store from '@/store'
import router from '@/router'
import '@/plugins'
import '@/middleware'
// ************************************
// ------------------------------------
import layout from '@/layouts/index.vue'
// ------------------------------------
// ************************************
import querystring from 'querystring'
// ------------------------------------
// ************************************
 
Vue.config.productionTip = false

// ------------------------------------
Vue.use(store)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

Vue.use(VueWait)

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
        useVuex: true,               // You must pass this option `true` to use Vuex
        vuexModuleName: 'wait',      // It's optional, `wait` by default.
        registerComponent: true,     // Registers `v-wait` component
        componentName: 'v-wait',     // <v-wait> component name, you can set `my-loader` etc.
        registerDirective: true,     // Registers `v-wait` directive
        directiveName: 'wait',       // <span v-wait /> directive name, you can set `my-loader` etc.
    }),
    render: h => h(layout),
})