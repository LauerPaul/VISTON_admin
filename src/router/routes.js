import CONFIG from '@/config_admin.js'
import Vue from 'vue'
import Meta from 'vue-meta'
import store from '@/store'

Vue.use(Meta)
// ------------------------------------------------

import auth from '@/pages/auth'
import template from '@/layouts/default'
import notFound from '@/pages/404'
import index from '@/pages/index'

import users from '@/pages/users'

import products from '@/pages/products'
import productsCategories from '@/pages/products/categories'
import productsArticles from '@/pages/products/articles'
import productsSeo from '@/pages/products/seo'

import productsCategory from '@/pages/products/category'
import productsArticle from '@/pages/products/article'

import settings from '@/pages/settings'
import settingsPrimary from '@/pages/settings'
import settingsMail from '@/pages/settings'

// Определяем языки
const langs = function(){
	var langsArray = null
	if(CONFIG.language.multilang){
		CONFIG.language.lng.forEach((obj)=>{
			if(obj.status){
				if(langsArray == null) langsArray = obj.code
				else langsArray += '|' + obj.code
			}
		})
	}else langsArray = CONFIG.language.default;
	console.log('%c App lang: ' + '%c' + langsArray + ' ',
				'background: #ffd600; color: #705e00; font-weight: bold; line-height: 24px',
				'background: #ffd600; color: #705e00; line-height: 24px');
	return langsArray
}

const routes = [
	{	
		/*Index page*/
		path: '/:lang('+langs()+')?',
     	props: true,
    	component: template,
        meta: {
            isAuth: false
        },
        children: [
			{
				path: '',
				name: 'home',
    			component: index,
		        meta: {
		            isAuth: true
		        },
			},
			{	
				/*Auth page*/
				path: "login",
				name: 'login',
				component: auth,
		        meta: {
		            isAuth: false
		        },
			},
			{	
				/*Logout page*/
				path: "logout",
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
				path: "users",
				name: 'users',
				component: users,
		        meta: {
		            isAuth: true
		        },
			},
			{	
				/*products page*/
				path: "products",
				name: 'products',
				component: products,
				redirect: 'products/menu',
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
						path: 'article',
						component: productsArticle,
						redirect: 'article',
				        children: [
				        	{
								path: ':id',
								name: 'productsArticle',
								component: productsArticle
							}
						]
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
				path: "settings",
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
				path: '404',
				name: 'notfound',
				component: notFound,
		        meta: {
		            isAuth: true
		        },
			},
			{
				path: '*',
				redirect: '404'
			}
		]
	},
	{
		path: '*',
		redirect: '/en'
	}
]

export default routes