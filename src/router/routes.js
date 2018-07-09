import Vue from 'vue'
import Meta from 'vue-meta'
import store from '@/store'

Vue.use(Meta)
// ------------------------------------------------

import auth from '@/pages/auth'
import notFound from '@/pages/404'
import index from '@/pages/index'

import users from '@/pages/users'

import products from '@/pages/products'
import productsCategories from '@/pages/products/categories'
import productsArticles from '@/pages/products/articles'
import productsSeo from '@/pages/products/seo'

import productsCategory from '@/pages/products/category'

import settings from '@/pages/settings'
import settingsPrimary from '@/pages/settings'
import settingsMail from '@/pages/settings'

const routes = [
	{	
		/*Index page*/
		path: "/",
		name: 'home',
		component: index,
        meta: {
            isAuth: true,
        },
	},
	{	
		/*Auth page*/
		path: "/login",
		name: 'login',
		component: auth,
        meta: {
            isAuth: false
        },
	},
	{	
		/*Logout page*/
		path: "/logout",
		name: 'logout',
		beforeEnter (to, from, next) {
			store.commit('logout');
		},
        meta: {
            isAuth: true
        },
	},
	{	
		/*Users page*/
		path: "/users",
		name: 'users',
		component: users,
        meta: {
            isAuth: true
        },
	},
	{	
		/*products page*/
		path: "/products",
		name: 'products',
		component: products,
		redirect: '/products/menu',
        meta: {
            isAuth: true,
        },
        children: [
        	{
				path: 'categories',
				name: 'productsCategories',
				component: productsCategories
			},
        	{
				path: 'category',
				component: productsCategory,
				redirect: 'category',
		        children: [
		        	{
						path: ':id',
						name: 'productsCategory',
						component: productsCategory
					}
				]
			},
        	{
				path: 'articles',
				name: 'productsArticles',
				component: productsArticles
			},
        	{
				path: 'seo',
				name: 'productsSeo',
				component: productsSeo
			},
        ]
	},
	{
		/*Settings*/
		path: "/settings",
		name: 'settings',
		component: settings,
		meta: {
            isAuth: true
        },
        children: [
        	{
				path: 'primary',
				name: 'settingsPrimary',
				component: settingsPrimary
			},
        	{
				path: 'mail',
				name: 'settingsMail',
				component: settingsMail
			},
        ]
	},
	/* Web-серверные ошибки и сообщения */
	{
		/* 404 - Page not found */
		path: '/404',
		name: 'notfound',
		component: notFound
	}, {
		path: '*',
		redirect: '/404'
	}
]

export default routes