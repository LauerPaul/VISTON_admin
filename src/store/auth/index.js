/**
* @vuedoc
* @module store/auth
* @see @/store/auth
*
* @version 1.0
* @desc Хранилище данных - авторизация/пользователь
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import querystring from 'querystring'
import Vue from 'vue'
import store from '@/store'
import notify from '@/app.config.js'
import router from '@/router'

const Auth = {
    state: {
        /**
        * @typedef {Object} State
        *   @property {boolean} auth - Пройдена ли авторизация
        *   @property {boolean} user - Данные пользователя 
        *   @property {boolean} token - Токен для API
        *   @property {boolean} isAdmin - Статус администратора
        *   @property {boolean} isModerator - Статус модератора
        *   @property {boolean} isManager - Статус менеджера
        *   @property {boolean} isSeoDev - Статус SEO-специалиста
        */
        auth: false,
        user: {},
        token: {},
        isAdmin: false,
        isModerator: false,
        isManager: false,
        isSeoDev: false,
        config: {
            sound: 1
        },
        accessTable: {
            products: {
                access: 1
            },
            productsMenu: {
                access: 1
            },
            productsCategories: {
                access: 1,
                remove: 1,
                edit: 1,
                add: 1
            },
            productsCategory: {
                access: 1
            },
            productsSeo:{
                access: 1
            }
        }
    },
    mutations: {
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос авторизации (JSON)
        *   @param data {object} - данные для авторизации
        *   @method getAuthentication
        **/
        getAuthentication: (state, data) => {
            return Vue.axios({
                method: 'post',
                url: '/',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                data: querystring.stringify(data)
            }).then(function(response, headers){

                if(response.data.status == "ERROR") {
                    store.dispatch('notify', {
                        type: 'error',
                        text: response.data.error,
                    })
                }
                else {
                    store.commit('auth', response.data.userData);
                }
            })
        },

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохраняем данные токена
        *   @param token {string} - token
        *   @method tokenAuth
        **/
        tokenAuth: (state, token) => {
            state.token = token
        },

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохраняем информацию о том, что пользователь авторизован
        *   @param data {object} - Данные пользователя
        *   @method auth
        **/
        auth: (state, data) => {
            state.auth = true
            state.user = data
            store.commit('stasusSet');
        },

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Назначение статуса пользователя
        *   @param data {object} - Данные пользователя
        *   @method stasusSet
        **/
        stasusSet (state, data) {
            if(parseInt(state.user.is_admin)) {
                state.isAdmin = true
            } else {
                state.isAdmin = false
            }

            if(parseInt(state.user.is_moderator)) {
                state.isModerator = true
            } else {
                state.isModerator = false
            }

            if(parseInt(state.user.is_manager)) {
                state.isManager = true
                console.log('is_manager');
            } else {
                state.isManager = false
            }

            if(parseInt(state.user.is_seo)) {
                state.isSeoDev = true
                console.log('is_seo');
            } else {
                state.isSeoDev = false
            }
        },

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> "Выходим" из аккаунта и удаляем все данные с auth()
        *   @method stasusSet
        **/
        logout: (state) => {
            state.auth = false
            state.user = {}
        }
    },
}

export default Auth