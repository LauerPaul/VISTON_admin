/**
* @vuedoc
* @module store/site
* @see @/store/site
*
* @version 1.0
* @desc Хранилище данных - основные данные приложенния
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import titles from '@/static/translate/titles'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import querystring from 'querystring'

const Site = {
    namespaced: true,
    state: {
        /**
        * @typedef {Object} State
        *   @property {string} default_language - Язык по умолчанию
        *   @property {boolean} logo - Логотип сайта
        *   @property {boolean} logo_alt - Alt логотипа сайта 
        *   @property {boolean} aside_min - Свернуто (минимизировано) [aside menu]{@link module:components/common/aside} 
        *   @property {boolean} logAdmin_write - Статус записи лога событий в админ панеле
        *   @property {string} current_language - Текущий язык
        *   @property {object|null} dictionary - Словарь
        *   @property {object|null} dictionary_lang - Язык словаря
        */
        default_language: 'en',
        logo: 'https://my2.lauer.com.ua/uploads/_site/logo.png',
        logo_alt: 'Lauer.agency admin cms',
        logAdmin_write: true,
        titles: titles,

        logAdmin_write_url: '/admin_logger/write',

        aside_min: false,
        current_language: undefined,
        dictionary: null,
        dictionary_lang: null
    },
    getters: {
        GET_WORD: state => word => {
            if(state.dictionary[word]) return state.dictionary[word]
            else return ''
        },

        GET_TITLE: state => title => {
            var lng = (state.current_language ? state.current_language : state.default_language)
            var AdminText = state.titles[lng][0] && state.titles[lng][0].adminPanel ? state.titles[lng][0].adminPanel : state.titles[state.default_language][0].adminPanel
            var PageText = state.titles[lng][0] && state.titles[lng][0][title] ? state.titles[lng][0][title] : state.titles[state.default_language][0][title]
            
            return PageText + ' | ' + AdminText
        }
    },
    mutations: {
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение режима [Aside menu]{@link module:components/common/aside} (минимизация меню)
        *   @method asideFull
        **/
        asideToggle(state, data){
            Vue.$log.debug('component \'Store site\' (@/store/site) - commit init');
            
            state.aside_min = !state.aside_min
        },

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запись событий админ панели в лог
        *   @param state {object} - state
        *   @param data {object} - данные
        *       @param data.date {int} - Дата (timestamp)
        *       @param data.user_id {int} - ID пользователя
        *       @param data.event {string} - Событие
        *       @param data.val {string} - Значение
        *       @param data.old_val {string} - Старое значение
        *   @method logWrite
        **/
        logWrite(state, data){
            return Vue.axios({
                method: 'post',
                url: state.logAdmin_write_url,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                data: querystring.stringify(data)
            }).then(function(response, headers){
                if(response.data.status == "ERROR") {
                    console.log(response.data.error);
                    store.dispatch('notify', {
                        type: 'error',
                        text: response.data.error,
                    })
                }
                else {
                    console.log('the event was recorded successfully');
                }
            })
        },
        
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Назначение переменной dictionary
        *   @param state {object} - state
        *   @param data {object} - объект слов в виде ключ-значение
        *   @method DICTIONARY_SET
        **/
        DICTIONARY_SET(state, data){
            console.log('test DICTIONARY_SET');
            state.dictionary = data.data
            state.dictionary_lang = data.lang
            console.log(state.dictionary_lang);
        },

        SET_DEFAUL_LANG(state, data){
            console.log('test SET_DEFAUL_LANG');
            state.current_language = state.default_language
            store.dispatch('Site/GET_DICTIONARY', {root:true})
        },

        SET_CURRENT_LANG(state, lang){
            console.log('test SET_CURRENT_LANG');
            if(lang == state.default_language) {
                store.commit('SET_DEFAUL_LANG')
            } else {
                state.current_language = lang
                store.dispatch('Site/GET_DICTIONARY', {root:true})
            }
        }
    },
    actions: {
        GET_DICTIONARY({state, commit}){
            console.log('test GET_DICTIONARY');

            if(!state.dictionary || state.dictionary_lang !== (state.current_language ? state.current_language : state.default_language)) {
                var url = (state.current_language ? state.current_language : state.default_language);

                console.log('load dictionary..');
                return Vue.axios({
                    method: 'post',
                    url: url + '/locales',
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    responseType: 'json',
                    data: ''
                }).then((response, headers) => {
                    if(response.data.status == "ERROR") {
                        console.warn('Layout \'index\' (@/layouts/index) - beforeCreate hook -> load dictionary ERROR');
                    }
                    else {
                        commit('DICTIONARY_SET', response.data);
                    }
                });
            }
            else {
                console.log('dictionary is current');
                return false
            }
              console.log('- Default lang - ', state.default_language);
              console.log('- Current lang - ', state.current_language);
              console.log('- Dictionary lang - ', state.dictionary_lang);
        },

        LANGUAGE_CONTROL({commit, state}, to){
            console.log(Vue.$wait);
            
            // Languages redirect 
            if(to.params.lang && 
              to.params.lang == 'en' || 
              to.params.lang == 'ru' || 
              to.params.lang == 'de' ||
              to.params.lang == 'ua')
            {
              // Если передан параметр языка и он равен языку по умолчанию
              if(to.params.lang == state.default_language){
                commit('SET_DEFAUL_LANG')
              }
              // Если передан параметр языка, но он не соответствует установленному текущему
              else if(to.params.lang !== state.current_language) {
                commit('SET_CURRENT_LANG', to.params.lang)
              }
            }else {
              // Сбрасываем язык на язык по умолчаннию, если параметр языка не передан
              // И если язык словаря не соответсвует установленному языку
              if(state.current_language !== state.default_language || state.dictionary_lang !== state.default_language || !state.dictionary){
                commit('SET_DEFAUL_LANG')
              }
            }
        }
    }
}

export default Site