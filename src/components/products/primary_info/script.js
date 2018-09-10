/**
* @vuedoc
* @module components/products/primary_info
* @see @/components/products/primary_info
*
* @version 1.0
* @desc Основная информация продукции
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import tinymce from '@tinymce/tinymce-vue'
import cropImage from 'vue-image-crop-upload'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {array} nameRules - Правила валидации поля name ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	* 	@property {array} urlRules - Правила валидации поля url ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	*	@property {boolean} transliteration - Статус транслитерации url от названия (зарезервированная переменная)
	*	@property {boolean} imageUploadWindow - Статус отображения окна кропа (зарезервированная переменная)
	*/
	nameRules: [
		v => !!v || 'Назваение обязательно к заполнению',
		v => (v && v.length > 4) || 'Имя должно быть более 4-х символов. Введено - ' + v.length
	],
	urlRules: [
		v => !!v || 'URL обязательно к заполнению',
		v => (v && v.length > 2) || 'URL должно быть более 2-х символов. Введено - ' + v.length
	],
	transliteration: false,
	imageUploadWindow: false,
	editorMiniDescription: {
		language_url: '/js/editor/ru.js',
		height: 150,
		menubar: false,
		plugins: 'wordcount',
		toolbar: 'undo redo | bold italic underline',
      	force_p_newlines : false,
	    forced_root_block : '',
		valid_elements: 'strong,em,span,br',
		valid_styles: {'*': 'color,text-decoration,text-align'},
		powerpaste_word_import: 'clean',
		powerpaste_html_import: 'clean',
		content_css: ['/styles/editor.min.css'],
		body_class: 'products_category_description_mini'
	},
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения изображения после кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	*	@method cropSuccess
	**/
	cropSuccess(imgDataUrl, field){
		this.$log.info('component \'Products primary_info\' (@/components/products/primary_info) - method init');

		this.props.imgDataUrl = imgDataUrl;
		this.props.img = imgDataUrl;
		this.props.imageNew = 'new';
	},
}

// Export component
export default {
	// Data
	data: () => (data),

	/**
	* @typedef {Object} Props
	* 	@property {object} props - название
	* 		@property {string} props.name - название
	* 		@property {string} props.url - url адрес
	* 		@property {boolean} props.status - статус видимости
	* 		@property {string} props.miniDescription - краткое описание
	* 		@property {string} props.img - ссылка изображения
	* 		@property {string} props.imgDataUrl - base64 изображения
	* 		@property {int} props.cropWidth - ширина кропа изщображения
	* 		@property {int} props.cropHeight - высота кропа изображения
	*/
	props: [
		'props',
	],

	/**
	* This module requires the components:
	*	- [vue-image-crop-upload]{@link https://github.com/dai-siki/vue-image-crop-upload}
	*	- [TinyMCE]{@link https://github.com/tinymce/tinymce-vue}
	*/
	components: {
		imageCover: cropImage,
		tinymce,
	},

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/products/primary_info~Component <strong>Products primary info</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Products primary_info\' (@/components/products/primary_info) - mounted hook init');
	},

	watch: {
		name(){
			this.$log.debug('component \'Products category\' (@/pages/products/category) - watch name');
			
			if(this.transliteration) {
				const url = this.$translit(this.name);
				this.url = url;
			}
			console.log(this.name);
		},
	}

}