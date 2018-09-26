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
	*
	*	@property {boolean} link - категория является ссылкой на эту публикацию
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

	link: false,
	text: {
		cancel: 'Отмена',
		add: 'Добавить'
	},
	categoriesList: null,
	categoryId: null,
	loading: false
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Закрытие окна добавления новой категории
	*	@method windowHide
	**/
	windowHide(){
		this.$log.info('module \'Add new category\' (@/components/blog/categories/new) - method init');

		this.$emit('close');
		this.newName = '';
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос родительских категорий
	*	@method getParents
	**/
	getParents(){
		this.$log.info('module \'Add new category\' (@/components/blog/categories/new) - method init');

		return this.axios({
            method: 'get',
            url: '/' + this.langSelect + this.catsUrl + 'no_link/',
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('module \'products articles\' (@/pages/products/articles) - AJAX error');
				this.$logger('error', 'Произошла ошибка при загрузке категорий продукции. Ошибка: ' + response.data.error)
            	this.$notify.error('Произошла ошибка при загрузке категорий продукции.')
            	console.log(response.data.error);
            }else {
				this.$log.debug('module \'products articles\' (@/pages/products/articles) - AJAX success');
                this.categoriesList = response.data.categories;
            }
        });
	},
	
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Добавление новой категории (AJAX)
	*	@method addCategory
	**/
	addCategory(e) {
		e.preventDefault();
		this.$log.info('module \'Add new category\' (@/components/blog/categories/new) - method init');

		if(this.$access('add')){
			if(this.$refs.form.validate()){
				this.submit = true;
				const url_ = this.$translit(this.newName)
				const data = {
					name: this.newName,
					lang: this.langSelect,
					url: url_,
					link: this.link,
					category_id: this.categoryId.id
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
						this.$log.error('module \'Add new category\' (@/components/blog/categories/new) - AJAX error');
						this.$logger('error', 'Добавление категории блога "' + this.newName + '". Ошибка: ' + response.data.error)

	                    this.$notify.error(response.data.error);
	                } else {
						this.$log.debug('module \'Add new category\' (@/components/blog/categories/new) - AJAX success');
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
	* 	@property {string} catsUrl - Url по которому будет запрошен список родительских категорий
	* 	@property {boolean} articles - Модуль вызван модулем публикаций
	*/
	props: [
		'url',
		'status',
		'articles',
		'catsUrl'
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
		},
		langSelect(){
			this.$log.info('module \'Add new category\' (@/components/blog/categories/new) - method watch init');
			this.getParents();
		}
	}

}