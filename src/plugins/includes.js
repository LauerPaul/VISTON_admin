import Vue from 'vue'

import VueLogger from 'vuejs-logger'
import VueLoggerOptions from "@/plugins/logger_options.js"
import BootstrapVue from 'bootstrap-vue'
import VueProgressBar from 'vue-progressbar'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'

// ***********************************

Vue.use(VueLogger, VueLoggerOptions)
Vue.use(BootstrapVue);
Vue.use(VeeValidate)

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        blue: '#1c3439'
    }
})
