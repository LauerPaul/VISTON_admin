/**
* @vuedoc
* @module plugins/notify
* @see @/plugins/notify
*
* @version 1.0
* @desc Плагин notify
* 	> Использует компонент [Notify (task)]{@link module:components/task} - в шаблоне вставляется как 'v-notify'
* 	> Обращается к [Store notify]{@link module:store/notify}
*	> ----------------------------------------------------------
* 	> Пример вызова: this.$notify.info(text, options)
* 	> Пример вызова: this.$notify.error(text, options)
* 	> Пример вызова: this.$notify.success(text, options)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import notify from '@/components/task'
import store from "@/store"

const NotifyPlugin = {
  install(Vue, options) {
    Vue.component('v-notify', notify);

    Vue.prototype.$notify = {

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Оповищение об ошибке
        *   @param text {string} - Текст оповищения
        *   @param options {object} - Объект параметров
        *   	@param options.mode {string} - Тип оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   	@param options.timeout {int} - Задержка перед автоматическим закрытием [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   @method error
        **/
    	error: function(text, options){
            if(text == undefined) return
    		
    		store.dispatch('notify', {
    			type: 'error',
    			text: text,
    			options: options,
    		})
    	},

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Оповищение об успехе
        *   @param text {string} - Текст оповищения
        *   @param options {object} - Объект параметров
        *   	@param options.mode {string} - Тип оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   	@param options.timeout {int} - Задержка перед автоматическим закрытием [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   @method success
        **/
    	success: function(text, options){
    		if(text == undefined) return
    		
    		store.dispatch('notify', {
    			type: 'success',
    			text: text,
    			options: options,
    		})
    	},

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Информационное оповищение
        *   @param text {string} - Текст оповищения
        *   @param options {object} - Объект параметров
        *   	@param options.mode {string} - Тип оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   	@param options.timeout {int} - Задержка перед автоматическим закрытием [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   @method info
        **/
    	info: function(text, options){
    		if(text == undefined) return
    		
    		store.dispatch('notify', {
    			type: 'info',
    			text: text,
    			options: options,
    		})
    	},

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Скрытие оповищения
        *   @method hide
        **/
    	hide: function(){
    		store.commit('notifyClear')
    	}
    }
  }
}

export default NotifyPlugin;