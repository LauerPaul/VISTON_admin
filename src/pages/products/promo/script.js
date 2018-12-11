/**
* @vuedoc
* @module pages/products/promo
* @see @/pages/products/promo
*
* @version 1.0
* @desc Страница настройки promo
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import tinymce from '@tinymce/tinymce-vue'
import cropImage from 'vue-image-crop-upload'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} urlGet - url для запроса данных
	*/
	getUrl: 'products/promo/',
	saveUrl: 'products/promo/save/',
	step: 'ru',
	item: '',
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
	imgDataUrl: '',
	loading: true,
	access: {
		edit: false
	},
	imageUploadWindow: false,
	cropWidth: 745,
	cropHeight: 306,
	img: '',
	imageNew: false
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения изображения после кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	*	@method cropSuccess
	**/
	cropSuccess(imgDataUrl, field){
		this.$log.info('component \'Products Promo\' (@/pages/products/promo) - method init');

		this.imgDataUrl = imgDataUrl;
		this.img = imgDataUrl;
		this.imageNew = 'new';
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос данных (AJAX)
	*	@method getList
	**/
	getData(lng=false){
		this.$log.info('page \'Products Promo\' (@/pages/products/promo) - method init');
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
				this.$log.error('page \'Vacatcy info\' (@/pages/products/promo) - AJAX error');
            	this.notify = 'Произошла ошибка при загрузке данных...'
                this.$store.commit('error', response.data.error);
            }
            else {
				this.$log.debug('page \'Vacatcy info\' (@/pages/products/promo) - AJAX success');
				this.item = ''
				this.item = response.data.data

				this.imgDataUrl = this.item.promo_img.value
				this.img = this.imgDataUrl == '' ? false : this.$root.domain + this.imgDataUrl + this.$random();
            }
        });
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохранение данных вакансии (AJAX)
	*	@method submit
	**/
	submit() {
		this.$log.info('page \'Vacatcy info\' (@/pages/products/promo) - method init');
		var url = !this.step ? this.saveUrl : this.step + '/' + this.saveUrl;

		if(this.$refs.form.validate()){
			this.loading = true;

			const data = {
				img: this.imgDataUrl,
				img_id: this.item.promo_img.id,
				image_new: this.imageNew,
				promo_btn_text: this.item.promo_btn_text.value,
				promo_btn_text_id: this.item.promo_btn_text.id,
				promo_link: this.item.promo_link.value,
				promo_link_id: this.item.promo_link.id,
				promo_text: this.item.promo_text.value,
				promo_text_id: this.item.promo_text.id,
				promo_title: this.item.promo_title.value,
				promo_title_id: this.item.promo_title.id
			}

			return this.axios({
                method: 'post',
                url: url,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify(data),
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
					this.$log.error('page \'Vacatcy info\' (@/pages/products/promo) - AJAX error');
					this.$logger('error', 'Произошла ошибка при сохранении данных. Ошибка: ' + response.data.error)
	            	this.$notify.error('Произошла ошибка при сохранении данных.')
	            	console.log(response.data.error);
                } else {
					this.$log.debug('page \'Vacatcy info\' (@/pages/products/promo) - AJAX success');
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

	// Method
	methods: methods,

	// Head
	metaInfo: {
		title: 'Админ панель - Продукция - Promo'
	},
	
	/**
	* This module requires the components:
	*	- [vue-image-crop-upload]{@link https://github.com/dai-siki/vue-image-crop-upload}
	*	- [TinyMCE]{@link https://github.com/tinymce/tinymce-vue}
	*/
	components: {
		imageCover: cropImage,
		tinymce,
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/products/promo~Page <strong>Products promo</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Products promo\' (@/pages/products/promo) - mounted hook init');
		this.access.edit  = this.$access('edit', true)
		this.getData()
	},
}