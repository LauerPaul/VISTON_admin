/**
* @vuedoc
* @module store/notify
* @see @/store/notify
*
* @version 1.0
* @desc Хранилище данных компонента [Notify]{@link module:components/task}
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const Notify = {
	state: {
        /**
        * @typedef {Object} State
        *   @property {boolean} snackbar - Статус активности модуля
        *   @property {string} color - Цвет оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   @property {string} mode - Тип оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   @property {int} timeout - Задержка перед автоматическим закрытием [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   @property {string} text - Текст оповищения
        */
		snackbar: false,
		color: 'info',
		mode: '',
		timeout: 6000,
		text: '',
	},
    mutations: {
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения данных перед отображением окна
        *   @param state {object} - объект state
        *
        *   @param obj {object} - объект ожидаемых данных
        *   	@param obj.options {object} - Опции модуля
        *   		@param obj.options.mode {string} - Тип оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   		@param obj.options.timeout {int} - Задержка перед автоматическим закрытием [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   	@param obj.text {string} - текст сообщения
        *   	@param obj.type {string} - тип сообщения (info|success|error)
        *
        *   @method notifyInit
        **/
    	notifyInit: (state, obj) => {
    		
            if(obj){
	    		var options = obj.options ? obj.options : null
				state.text = obj.text
				state.snackbar = true
				state.color = obj.type

				if(options){
					state.mode = options.mode ? options.mode : state.mode
					state.timeout = options.timeout ? options.timeout : state.timeout
				}
    		}
    		else{
    			return
    		}
    	},

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Очистка данных state
        *   @param state {object} - объект state
        *   @method notifyClear
        **/
    	notifyClear: (state) => {
            state.snackbar = false
			state.color = 'info'
			state.mode = ''
			state.timeout = 6000
			state.text = ''
    	}
	},
	actions: {
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов notify
        *		> Вызов notifyClear()
        *		> Очистка таймаута (если был инициализирован)
        *		> Вызов notifyInit()
        *		> Установка таймаута с последующим вызовом notifyClear()
        *
        *   @param context {object} - объект store
        *
        *   @param obj {object} - объект ожидаемых данных
        *   	@param obj.options {object} - Опции модуля
        *   		@param obj.options.mode {string} - Тип оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   		@param obj.options.timeout {int} - Задержка перед автоматическим закрытием [подробнее]{@link https://vuetifyjs.com/en/components/snackbars}
        *   	@param obj.text {string} - текст сообщения
        *   	@param obj.type {string} - тип сообщения (info|success|error)
        *   @method notify
        **/
		notify (context, obj) {
            context.commit('notifyClear')

    		if(window.NotifyTimer) {
                clearTimeout(window.NotifyTimer)
            }
			
            context.commit('notifyInit', obj)

			window.NotifyTimer = setTimeout(()=>{
                context.commit('notifyClear')
			}, context.state.timeout + 500)
		}

	}
}

export default Notify