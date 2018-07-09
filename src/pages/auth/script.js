/**
* @vuedoc
* @module pages/auth
* @see @/pages/auth
*
* @version 1.0
* @desc Страница авторизации (Auth)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import bubbles from '@/components/animation/bubbles'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {boolean} valid - Валидация (зарезервированная переменная)
	* 	@property {boolean|null} loader - Статус отправки данных (зарезервированная переменная)
	* 	@property {boolean} loading - Статус отправки данных (зарезервированная переменная)
	* 	@property {boolean} hidePass - Статус видимости пароля (input type text|password)
	*
	* 	@property {string} login - Логин (зарезервированная переменная)
	* 	@property {array} loginRules - Правила валидации поля "логин" ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	* 	@property {string} password - Пароль (зарезервированная переменная)
	* 	@property {array} passwordRules - Правила валидации поля "пароль" ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	*/
	valid: true,
	loader: null,
	loading: false,
	hidePass: true,
	
	login: '',
	loginRules: [
		v => !!v || 'Логин - обязательное поле!',
		v => (v && v.length >= 2) || '...'
	],
	password: '',
	passwordRules: [
		v => !!v || 'Пароль - обязательное поле!',
		v => (v && v.length >= 5) || 'Не менее 5 символов!'
	],
}


const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Отправка данных авторизации (AJAX)
	*	@method submit
	**/
	submit() {
		if (this.$refs.form.validate()) {
			this.loader = 'loading';

			const data = {
					login: this.login,
					passwd: this.password
				}

			this.$store.commit('getAuthentication', data);
			this.loader = null;
			this.loading = false;
			this.$refs.form.inputs[1].reset()
		}
	}
}

/** Export component */
export default {
	// Data
	data: function(){ return data },

	/**
	* This page requires the components:
	*	- [Animation bubbles]{@link module:components/animation/bubbles}
	*/
    components: {
    	bubbles
    },

	// Head
	metaInfo: {
		title: 'Админ панель - Авторизация'
	},
	
	// Method
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/auth~Page <strong>Auth</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Auth\' (@/pages/auth) - mounted hook init');
	},

	/**
	* This page watch:
	*	- variable "loader"
	*/
	watch: {
      loader () {
		const l = this.loader
		this[l] = !this[l]
		this.loader = null
      }
    },
}