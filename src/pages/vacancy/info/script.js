/**
* @vuedoc
* @module pages/vacancy/info
* @see @/pages/vacancy/info
*
* @version 1.0
* @desc Страница карьеры (вакансий)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import tinymce from '@tinymce/tinymce-vue'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} urlGet - url для запроса данных
	*/
	getUrl: 'vacancy/info/',
	saveUrl: 'vacancy/info/save/',
	step: 'ru',
	item: '',
	titleRules: [
		v => !!v || 'Название вакансии - заполнение обязательно',
		v => (v && v.length > 10) || 'Не менее 10 символов. Введено - ' + v.length
	],
	editText: {
		language_url: '/js/editor/ru.js',
		height: 250,
		menubar: false,
		force_br_newlines : false,
		force_p_newlines : false,
		forced_root_block : '',
		plugins: 'wordcount, autoresize, code, fullscreen, link',
		autoresize_bottom_margin: 24,
		autoresize_max_height: 250,
		autoresize_min_height: 200,
		autoresize_on_init: true,
		toolbar: 'undo redo | removeformat cut copy paste | bold italic underline | link openlink | code fullscreen |',
		invalid_elements: 'h1, h2, h3, h4, h5',
		valid_styles: {'*': 'color,text-decoration,text-align'},
		powerpaste_word_import: 'clean',
		powerpaste_html_import: 'clean',
		content_css: ['/styles/editor.min.css'],
		block_formats: 'Paragraph=span;',
		body_class: 'products_category_description'
	},
	loading: true,
	access: {
		edit: false
	}
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос данных (AJAX)
	*	@method getList
	**/
	getData(lng=false){
		this.$log.info('page \'Vacancy info\' (@/pages/vacancy/info) - method init');
		var url = !lng ? this.getUrl : lng + '/' + this.getUrl;

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
				this.$log.error('page \'Vacatcy info\' (@/pages/vacancy/info) - AJAX error');
            	this.notify = 'Произошла ошибка при загрузке данных...'
                this.$store.commit('error', response.data.error);
            }
            else {
				this.$log.debug('page \'Vacatcy info\' (@/pages/vacancy/info) - AJAX success');
				this.item = ''
				this.item = response.data.data
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохранение данных вакансии (AJAX)
	*	@method submit
	**/
	submit() {
		this.$log.info('page \'Vacatcy info\' (@/pages/vacancy/info) - method init');

		if(this.$refs.form.validate()){
			this.loading = true;

			const data = {
				'text_id': this.item.text_id,
				'title_id': this.item.title_id,
				'title': this.item.title,
				'text': this.item.text
			}

			return this.axios({
                method: 'post',
                url: this.saveUrl,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify(data),
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
					this.$log.error('page \'Vacatcy info\' (@/pages/vacancy/info) - AJAX error');
					this.$logger('error', 'Произошла ошибка при сохранении данных. Ошибка: ' + response.data.error)
	            	this.$notify.error('Произошла ошибка при сохранении данных.')
	            	console.log(response.data.error);
                } else {
					this.$log.debug('page \'Vacatcy info\' (@/pages/vacancy/info) - AJAX success');
                    this.$notify.success('Изменения сохранены!');
                    location.reload();
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
		tinymce
	},

	// Method
	methods: methods,

	// Head
	metaInfo: {
		title: 'Админ панель - Инфо-блок Вакансии'
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/vacancy/info~Page <strong>Vacancy info</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Vacancy info\' (@/pages/vacancy/info) - mounted hook init');
		this.access.edit  = this.$access('edit', true)
		this.getData()
	},
}