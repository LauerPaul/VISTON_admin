/**
* @vuedoc
* @module components/task
* @see @/components/task
*
* @version 1.0
* @desc Компонент оповищений (Notify)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
export default {
	data: () => ({
		/**
		* @typedef {Object} Data
		* 	@property {string} text_ok - Текст кпноки закрытия оповищения (нпаример: ОК)
		*/
		text_ok: 'OK'
	}),
	computed: {
		/**
		* @typedef {Object} Computed
		* 	@property {string} snackbar - Статус видимости окна [подробнее]{@link https://vuetifyjs.com/en/components/snackbars} наследует из [Store notify]{@link module:store/notify}
		* 	@property {string} text - Текст оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars} наследует из [Store notify]{@link module:store/notify}
		* 	@property {string} timeout - Таймаут перед скрытием окна [подробнее]{@link https://vuetifyjs.com/en/components/snackbars} наследует из [Store notify]{@link module:store/notify}
		* 	@property {string} mode - Тип оповищения [подробнее]{@link https://vuetifyjs.com/en/components/snackbars} наследует из [Store notify]{@link module:store/notify}
		* 	@property {string} color - Задержка перед автоматическим закрытием [подробнее]{@link https://vuetifyjs.com/en/components/snackbars} наследует из [Store notify]{@link module:store/notify}
		*/
		snackbar:{
			get: function () {
				return this.$store.state.Notify.snackbar
			},
			set: function (v) {
				this.$notify.hide()
			}
		},
		text: function(){
			return this.$store.state.Notify.text
		},
		timeout: function(){
			return this.$store.state.Notify.timeout
		},
		mode: function(){
			return this.$store.state.Notify.mode
		},
		color: function(){
			return this.$store.state.Notify.color
		}
	},

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> > Вызов $notify.hide()
	* @event module:components/task~Component <strong>Notify (task)</strong> beforeMount
	*/
	beforeMount: function (){
		this.$log.info('component \'Notify (task)\' (@/components/task) - mounted beforeMount init');
		this.$notify.hide()
	},

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/task~Component <strong>Notify (task)</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Notify (task)\' (@/components/task) - mounted hook init');
	},
}