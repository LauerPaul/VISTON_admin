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
import CONFIG from '@/config_admin.js'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import querystring from 'querystring'

const Site = {
    namespaced: true,
    state: {
        /**
        * @typedef {Object} State
        *
        *   @property {boolean} logo - Логотип сайта
        *   @property {boolean} logo_alt - Alt логотипа сайта 
        *   @property {object} titles - Заголовки страниц
        *
        *   @property {string} default_language - Язык по умолчанию
        *   @property {boolean} multilang - Статус мультиязычности приложения
        *   @property {object} languages - Массив используемых языков в админ панеле
        *   @property {object} dictionary - Словарь
        *
        *   @property {boolean} logAdmin_write - Статус записи лога событий в админ панеле
        *   @property {boolean} logAdmin_write_url - Ссылка для отправки событий в лог на сервер
        *
        *   @property {boolean} aside_min - Свернуто (минимизировано) [aside menu]{@link module:components/common/aside} 
        *   @property {string|undefined} curLng - Текущий язык
        *   @property {string|undefined} urlPrefix - Префикс для подстановки к юрл 
        */
            // ===============================================
                logo: CONFIG.logo.src,
                logo_alt: CONFIG.logo.alt,
                titles: CONFIG.titles,
            // ***********************************************
                default_language: CONFIG.language.default,
                multilang: CONFIG.language.multilang,
                langs: CONFIG.language.library,
                dictionary: CONFIG.dictionary,
            // ***********************************************
                logAdmin_write: CONFIG.developer.logStatus,
                logAdmin_write_url: CONFIG.developer.logWriteLink,
            // ===============================================
        aside_min: false,
        curLng: undefined,
        urlPrefix: undefined
    },
    getters: {
        /**
        *  @desc <strong style="color:red; font-size: 18px;">ⓘ GETTERS</strong> Возвращает функцию, если высвать ее и передать аргумент **word** (ключ к слову),
        *  -> вернет слово из словаря 
        *   @method GET_WORD
        **/
        GET_WORD: state => word => {
            if(state.dictionary[state.curLng][word]) return state.dictionary[state.curLng][word]
            else return state.dictionary[state.default_language][word]
        },

        /**
        *  @desc <strong style="color:red; font-size: 18px;">ⓘ GETTERS</strong> Возвращает функцию, если высвать ее и передать аргумент **title** (ключ к title - название страницы),
        *  -> вернет title из словаря 
        *   @method GET_TITLE
        **/
        GET_TITLE: state => title => {
            var AdminText = state.titles[state.curLng] && state.titles[state.curLng].adminPanel ? state.titles[state.curLng].adminPanel : state.titles[state.default_language].adminPanel
            var PageText = state.titles[state.curLng] && state.titles[state.curLng][title] ? state.titles[state.curLng][title] : state.titles[state.default_language][title]
            return PageText + ' | ' + AdminText
        }
    },
    mutations: {
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ MUTATIONS</strong> Переключение режима [Aside menu]{@link module:components/common/aside} (минимизация меню)
        *   @method asideFull
        **/
        asideToggle(state, data){
            Vue.$log.debug('component \'Store site\' (@/store/site) - commit init');
            
            state.aside_min = !state.aside_min
        },

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ MUTATIONS</strong> Запись событий админ панели в лог
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
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ MUTATIONS</strong> Назначение активным язык
        *   @param state {object} - state
        *   @param lang {string} - язык, который нужно установить, как активный (если аргумент отсутствует, будет установлен язык по умолчанию)
        *   @method SET_CURRENT_LANG
        **/
        SET_CURRENT_LANG(state, lang){
            console.log('SET_CURRENT_LANG');
            if(lang == undefined || lang == state.default_language){
                state.curLng = state.default_language
                state.urlPrefix = undefined
                console.log('SET_DEFAUL_LANG: ', state.curLng);
            }else {
                state.curLng = lang
                state.urlPrefix = state.curLng 
                console.log('SET_LANG: ', state.curLng);
            }
        }
    },
    actions: {        
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ ACTIONS</strong> Определение параметров языка (запускается из роутера)
        *   @param to {object} - аргумент **to** из роутера
        *   @method LANGUAGE_CONTROL
        **/
        LANGUAGE_CONTROL({commit, state}, to){
            // Если включен параметр мультиязычности
            if(state.multilang){
                // Languages redirect 
                if(to.params.lang){
                    // Если передан параметр языка и он равен языку по умолчанию
                    if(to.params.lang == state.default_language){
                        if(state.default_language !== state.curLng){
                            commit('SET_CURRENT_LANG')  // Set default lang
                        }
                    }
                    // Если передан параметр языка, но он не соответствует установленному текущему
                    else if(to.params.lang !== state.curLng) {
                        var notFound = true;

                        state.langs.forEach((obj)=>{
                            if(obj.status && obj.code == to.params.lang){
                                commit('SET_CURRENT_LANG', to.params.lang)
                                notFound = false
                            }
                        })

                        if(notFound){
                            commit('SET_CURRENT_LANG')
                        }
                    }
                }else {
                  // Сбрасываем язык на язык по умолчаннию, если параметр языка не передан
                  // И если язык словаря не соответсвует установленному языку
                  if(state.curLng !== state.default_language){
                    return commit('SET_CURRENT_LANG')  // Set default lang
                  }
                }
            // Если выключен параметр мультиязычности
            }else {
                if(state.curLng == undefined) {
                    return commit('SET_CURRENT_LANG')  // Set default lang
                }
            }
        }
    }
}

export default Site