/**
* @vuedoc
* @module pages/services/item
* @see @/pages/services/item
*
* @version 1.0
* @desc Страница редактирования услуги
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import tinymce from '@tinymce/tinymce-vue'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} getItemUrl - url для запроса данных
	* 	@property {int} id - id записи (зарезервированная переменная)
	*	@property {boolean} loading - Статус загрузки данных (зарезервированная переменная)
	*	@property {object} access - права доступа (зарезервированная переменная)
	*		@property {boolean} access.edit - права доступа на редактирование (зарезервированная переменная)
	* 	@property {array} titleRules - Правила валидации поля title ( [подробнее]{@link https://vuetifyjs.com/en/components/forms} )
	*	
	*	@property {string} item - данные записи (зарезервированная переменная)
	*
	*/
	getItemUrl: '/services/item/',
	saveItemUrl: '/services/save/',
	id: 0,
	step: 0,
	loading: true,
	access: {
		edit: false
	},
	current: false,
	item: '',
	titleRules: [
		v => !!v || 'Название услуги - заполнение обязательно',
		v => (v && v.length > 10) || 'Не менее 10 символов. Введено - ' + v.length
	],
	editText: {
		language_url: '/js/editor/ru.js',
		height: 250,
		menubar: false,
		plugins: 'wordcount, autoresize, code, fullscreen, link',
		autoresize_bottom_margin: 24,
		autoresize_max_height: 250,
		autoresize_min_height: 200,
		autoresize_on_init: true,
		toolbar: 'undo redo | formatselect | removeformat cut copy paste | bold italic underline | link openlink | code fullscreen |',
		invalid_elements: 'h1, h5',
		valid_styles: {'*': 'color,text-decoration,text-align'},
		powerpaste_word_import: 'clean',
		powerpaste_html_import: 'clean',
		content_css: ['/styles/editor.min.css'],
		body_class: 'products_category_description',
		block_formats: 'Paragraph=p;Header 2=h2;Header 3=h3;Header 4=h4'
	}
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Назначение данных страницы
	*	@method getItemData
	**/
	getItemData(){
		this.$log.info('page \'Services item\' (@/pages/services/item) - method init');

		return this.axios({
            method: 'get',
            url: this.getItemUrl + this.id + '/',
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {      
            this.loading = false;
            if(response.data.status == "ERROR") {
				this.$log.error('page \'Services item\' (@/pages/services/item) - AJAX error');
            	this.notify = 'Произошла ошибка при загрузке данных...'
                this.$store.commit('error', response.data.error);
            }
            else {
				this.$log.debug('page \'Services item\' (@/pages/services/item) - AJAX success');
				this.item = ''

				this.item = response.data.data
				this.item.status = parseInt(this.item.status)

				this.current = {}
				this.current.status = parseInt(response.data.data.status)
				this.current.sort = parseInt(response.data.data.sort)
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохранение данных услуги (AJAX)
	*	@method submit
	**/
	submit() {
		this.$log.info('page \'Services item\' (@/pages/services/item) - method init');

		if(this.$refs.form.validate()){
			this.loading = true;

			const data = {
				'title': this.item.title,
				'text': this.item.text,
				'sort': this.item.sort,
				'status': this.item.status ? 1 : 0
			}

			return this.axios({
                method: 'post',
                url: this.saveItemUrl + this.id + '/',
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify(data),
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
					this.$log.error('page \'Products article\' (@/pages/products/article) - AJAX error');
					this.$logger('error', 'Произошла ошибка при сохранении данных услуги. Ошибка: ' + response.data.error)
	            	this.$notify.error('Произошла ошибка при сохранении данных услуги.')
	            	console.log(response.data.error);
                } else {
					this.$log.debug('page \'Products article\' (@/pages/products/article) - AJAX success');
                    this.$notify.success('Изменения сохранены!');
                    // this.getItemData();
		            this.$router.push({name: 'servicesList'});
 				}
            });

		} else {
			this.$notify.error('Исправьте все ошибки в форме');
		}
	}
}


/** Export component */
export default {
	// Set data
	data: function(){ return data },
	
	/**
	* This page requires the components:
	*	- [TinyMCE]{@link https://github.com/tinymce/tinymce-vue}
	*/
	components: {
		tinymce,
	},

	// Method
	methods: methods,

	// Head
	metaInfo: {
		title: 'Админ панель - Редактирование услуги'
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/services/item~Page <strong>Services item</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Services item\' (@/pages/services/item) - mounted hook init');

		this.access.edit  = this.$access('edit', true)
		this.id = this.$route.params.id;
		this.getItemData();
	},
}