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
import { mapGetters, mapState } from 'vuex'

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
	*
	* 	@property {object} text - тексты
	*/
	valid: true,
	loader: null,
	loading: false,
	hidePass: true,
	
	login: '',
	loginRules: [],
	password: '',
	passwordRules: [],

	text: {
		pageTitle: 'Loading...',
		login: '',
		password: '',
		characters_5_min: '',
		done: ''
	}
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Отправка данных авторизации (AJAX)
	*	@method submit
	**/
	submit(){
		// Dev. debug
		this.$log.debug('page \'Auth\' (@/pages/auth) - method init');

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
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Назначение тектов (переводов)
	*	@method setText
	**/
	setText(){
		// Dev. debug
		this.$log.debug('page \'Auth\' (@/pages/auth) - method init');
		
		this.text.login = this.GET_WORD('login')
		this.text.password = this.GET_WORD('password')
		this.text.characters_5_min = this.GET_WORD('characters_5_min')
		this.text.done = this.GET_WORD('done')

		// Validation set
		this.loginRules = [
			v => !!v || this.GET_WORD('login') + ' - ' + this.GET_WORD('required') + '!',
			v => (v && v.length >= 2) || '...'
		]
		this.passwordRules = [
			v => !!v || this.GET_WORD('password') + ' - ' + this.GET_WORD('required') + '!',
			v => (v && v.length >= 5) || this.GET_WORD('characters_5_min')
		]
	}
}

/** Export component */
export default {
	// Data
	data: function(){ 
		return data
	},

    /**
	* @typedef {Object} Computed
	*	@property {boolean} logo - Логотип сайта (из Store Site)
	*	@property {boolean} logo_alt - alt логотипа сайта (из Store Site)
	*/
	computed: {
		...mapGetters('Site', [ 'GET_WORD', 'GET_TITLE' ]),
		...mapState('Site', {
			dictionary: 'dictionary',
			lng : 'current_language'
		})
	},

	/**
	* This page requires the components:
	*	- [Animation bubbles]{@link module:components/animation/bubbles}
	*/
    components: {
    	bubbles
    },

	// // Head
	metaInfo () {
		return {
			title: this.GET_TITLE('Auth'),
    	}
	},

	// Method
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/auth~Page <strong>Auth</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Auth\' (@/pages/auth) - mounted hook init');
		this.setText();
	},

	/**
	* This page watch:
	*	- variable "loader"
	*/
	watch: {
      loader(){
		const l = this.loader
		this[l] = !this[l]
		this.loader = null
      },

      // Отслеживаем изменение языка
      dictionary(){ return this.setText() }
    },
}