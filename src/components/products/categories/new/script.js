/**
* @vuedoc
* @module components/blog/categories/new
* @see @/components/blog/categories/new
*
* @version 1.0
* @desc Компонент добавления новой категории
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
const data = {
	/**
	* @typedef {Object} Data
	*	@property {boolean} visible - Статус видимости окна (зарезервированная переменная)
	*	@property {boolean} submit - Статус отправки формы (зарезервированная переменная)
	* 	@property {boolean} valid - Валидация (зарезервированная переменная)
	* 	@property {array} langs - Массив языков для select
	*
	*	@property {string} newName - Название новой категори (Зарезервированная переменная)
	*	@property {string} langSelect - Язык новой категори (Зарезервированная переменная)
	* 	@property {array} nameRules - Правила валидации поля name ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	*
	*	@property {object} text - Текст
	*		@property {string} text.cancel - Текст кнопки "Отмена"
	*		@property {string} text.add - Текст кнопки "Добавить"
	*/
	visible: false,
	submit: false,
	valid: true,
	langs: ['ru', 'en', 'de'],

	newName: '',
	langSelect: null,
	nameRules: [
		v => !!v || 'Назваение обязательно к заполнению',
		v => (v && v.length > 4) || 'Имя должно быть более 4-х символов. Введено - ' + v.length
	],

	text: {
		cancel: 'Отмена',
		add: 'Добавить'
	}
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Закрытие окна добавления новой категории
	*	@method windowHide
	**/
	windowHide(){
		this.$log.info('page \'Add new category\' (@/components/blog/categories/new) - method init');

		this.$emit('close');
		this.newName = '';
	},
	
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Добавление новой категории (AJAX)
	*	@method addCategory
	**/
	addCategory(e) {
		e.preventDefault();
		this.$log.info('page \'Add new category\' (@/components/blog/categories/new) - method init');

		if(this.$access('add')){
			if(this.$refs.form.validate()){
				this.submit = true;
				const url_ = this.$translit(this.newName)
				const data = {
					name: this.newName,
					lang: this.langSelect,
					url: url_
				}

				return this.axios({
	                method: 'post',
	                url: this.url,
	                withCredentials: true,
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                responseType: 'json',
	                data: this.$root.querystring.stringify(data),
	            }).then((response) => {
	                this.submit = false;
	                if(response.data.status == "ERROR") {
						this.$log.error('page \'Add new category\' (@/components/blog/categories/new) - AJAX error');
						this.$logger('error', 'Добавление категории блога "' + this.newName + '". Ошибка: ' + response.data.error)

	                    this.$notify.error(response.data.error);
	                } else {
						this.$log.debug('page \'Add new category\' (@/components/blog/categories/new) - AJAX success');
						this.$logger('add', 'Добавление категории блога - "' + this.newName + '"')

	                    this.$notify.success('Новая категория добавлена успешно!');
	                	this.windowHide()
	                    this.$router.push({name: 'productsCategory', params: {id: response.data.id}});
	 				}
	            });
			}
		} else {
			return this.windowHide()
		}
	}
}

// Export component
export default {
	// Data
	data: () => (data),

	/**
	* @typedef {Object} Props
	* 	@property {string} url - Url по которому будет отправлен запрос на добавление новой категории блога
	* 	@property {boolean} status - Статус видимости модуля
	*/
	props: [
		'url',
		'status'
	],

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/blog/categories/new~Component <strong>Add new category (task)</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Add new category\' (@/components/blog/categories/new) - mounted hook init');

		this.visible = this.status
	},

	watch: {
		'status': function(){
			this.visible = this.status
		}
	}

}