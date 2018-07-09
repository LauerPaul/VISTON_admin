import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from '@/router/routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
	routes: routes,
	linkActiveClass: 'activeLink',
    linkExactActiveClass: 'globalActiveLink'
})

export default router