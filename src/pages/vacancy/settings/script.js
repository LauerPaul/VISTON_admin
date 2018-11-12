/**
* @vuedoc
* @module pages/vacancy/settings
* @see @/pages/vacancy/settings
*
* @version 1.0
* @desc Страница настроек раздела "пуслугии"
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} urlGetSettings - url для загрузки настроек раздела
	*
	* 	@property {boolean} valid - Валидация (зарезервированная переменная)
	*	@property {boolean} loading - Статус загрузки таблицы
	*	@property {int} seoId - ID категории в базе данных
	*
	*	@property {object} seo - SEO данные категории
	*		@property {string} seo.seoTitle - meta title (зарезервированная переменная)
	*		@property {string} seo.seoDescription - meta description (зарезервированная переменная)
	*		@property {string} seo.seoOgTitle - meta Open Graph title (зарезервированная переменная)
	*		@property {string} seo.seoOgDescription - meta Open Graph description (зарезервированная переменная)
	*		@property {string} seo.seoOgImage - meta Open Graph image (зарезервированная переменная)
	*		@property {string} seo.seoOgImg - meta Open Graph image (зарезервированная переменная)
	*		@property {string} seo.seoRobots - robots param (зарезервированная переменная)
	*		@property {string} seo.seoMicro - микроразметка (зарезервированная переменная)
	*		@property {boolean} seo.imageOgNew - переменная изменяет значение, если добавлено новое изображение seoOgImg (зарезервированная переменная)
	*/
	urlGetSettings: '/vacancy/settings/',
	valid: true,
	loading: true,
	access: {
		edit: false
	},
	allSwitch: [],
	settings: [],
	step: 'show'
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение статуса группы
	*	@method changeAll
	**/
	changeAll(index){
		this.$log.debug('page \'Vacancy settings\' (@/pages/vacancy/settings) - method init');
		this.settings[index].items.forEach( (item) => { item.status = this.allSwitch[index] });	
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Обновление статуса selected all
	*	@method changeOption
	**/
	changeOption(){
		this.$log.debug('page \'Vacancy settings\' (@/pages/vacancy/settings) - method init');
		this.settings.forEach( (element, index) => {
			let all = true;
			element.items.forEach( function(item, i) {
				if(!item.status) all = false	
			});	
			this.allSwitch[index] = all
		});
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос настроек страницы услуги
	*	@method getSettings
	**/
	getSettings (lng = false){
		this.$log.info('page \'Vacancy settings\' (@/pages/vacancy/settings) - method init');
		var url = !lng ? this.urlGetSettings : '/' + lng + this.urlGetSettings;
		
		return this.axios({
            method: 'get',
            url: url,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Vacancy settings\' (@/pages/vacancy/settings) - AJAX error (GET)');
                this.$logger('error', 'Произошла ошибка при загрузке настроек услуги. Ошибка: ' + response.data.error)
            	this.$notify.error('Произошла ошибка при загрузке настроек...')
            }
            else {
				this.$log.debug('page \'Vacancy settings\' (@/pages/vacancy/settings) - AJAX success');
				console.log(response.data.data);
				var data = response.data.data.status;
				var settings_ = [];

				data.forEach( (element) => {
					settings_.push({
						name: element.name,
						key: element.key,
						disabled: element.disabled,
						items: element.items
					});
					this.allSwitch.push(false);

					element.items.forEach( (item) => {
						item.status = parseInt(item.status)
					});
				});

				this.settings = settings_
				this.loading = false
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сбор полей для отправки
	*	@method parseData
	**/
	parseData(){
		this.$log.info('page \'Vacancy settings\' (@/pages/vacancy/settings) - method init');

		console.log(this.settings);
		var data = '[';
		this.settings.forEach( (element, index) => {
			element.items.forEach( (item) => {
				let row = '{"'+item.id+'":"'+(item.status ? 1 : 0)+'"}'
				data += data == '[' ? row : ','+row
			});
			data += index == this.settings.length-1 ? ']' : ''
		});

		return data
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохранение SEO данных категории (AJAX)
	*	@method submit
	**/
	submit() {
		this.$log.info('page \'Vacancy settings\' (@/pages/vacancy/settings) - method init');
		
		if(this.access.edit){
			if(this.$refs.form.validate()){
				this.loading = true;

				const status = this.parseData();
				const data = {
					status: status
				}

				return this.axios({
	                method: 'post',
	                url: this.urlGetSettings + 'save/',
	                withCredentials: true,
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                responseType: 'json',
	                data: this.$root.querystring.stringify(data),
	            }).then((response) => {
	                this.loading = false;

	                if(response.data.status == "ERROR") {
						this.$log.error('page \'Vacancy settings\' (@/pages/vacancy/settings) - AJAX error');
	                    this.$logger('error', 'Произошла ошибка при сохранении настроек услуги. Ошибка: ' + response.data.error)
	                	this.$notify.error('Произошла ошибка при сохранении настроек...')
		            	console.log(response.data.error);
	                } else {
						this.$log.debug('page \'Vacancy settings\' (@/pages/vacancy/settings) - AJAX success');
	                    this.$notify.success('Настройки сохранены!');
	                    this.getSettings();
	 				}
	            });

			} else {
				this.$store.commit('error', {error: 'Исправьте все ошибки в форме'});
			}
		}
	}
}

/** Export component */
export default {
	// Set data
	data() { return data },
	
	/**
	* This page requires the components:
	*/
	components: {
	},

	// Head
	metaInfo: {
		title: 'Админ панель - Настройки раздела "услуги"'
	},

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода getSettings()
	* @event module:pages/vacancy/settings~Page <strong>Vacancy settings</strong> mounted
	*/
	mounted: function(){
		this.$log.info('page \'Vacancy settings\' (@/pages/vacancy/settings) - mounted hook init');
		this.access.edit  = this.$access('edit', true);
		this.getSettings();
	},

	watch: {
		settings: {
			handler: function (val, oldVal) {
				this.changeOption();
			},
			deep: true
		}
	}
}