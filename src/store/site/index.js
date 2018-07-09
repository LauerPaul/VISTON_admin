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
import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import querystring from 'querystring'

const Site = {
    state: {
        /**
        * @typedef {Object} State
        *   @property {boolean} logo - Логотип сайта
        *   @property {boolean} logo_alt - Alt логотипа сайта 
        *   @property {boolean} aside_min - Свернуто (минимизировано) [aside menu]{@link module:components/common/aside} 
        *   @property {boolean} logAdmin_write - Статус записи лога событий в админ панеле
        */
    	logo: require('@/assets/img/common/logo.png'),
        logo_alt: 'Lauer.agency admin cms',
        aside_min: false,
        logAdmin_write: true,
        logAdmin_write_url: '/admin_logger/write',
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
        }
    }
}

export default Site