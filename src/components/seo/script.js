/**
* @vuedoc
* @module components/seo
* @see @/components/seo
*
* @version 1.0
* @desc Компонент SEO - поля формы для заполнения seo-данных
*	> Компонент использует плагин [vue-image-crop-upload]{@link https://github.com/dai-siki/vue-image-crop-upload}
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import cropImage from 'vue-image-crop-upload';

export default {
	// Props	
	props: [
		/**
		* @typedef {Object} Props
		* 	@property {string} required - Статус элемента (влияет на параметр required полей формы)
		* 	@property {object} props - Параметры
		* 		@property {string} props.seoTitle - meta title (зарезервированная переменная)
		* 		@property {string} props.seoDescription - meta description (зарезервированная переменная)
		* 		@property {string} props.seoOgTitle - meta Open Graph title (зарезервированная переменная)
		* 		@property {string} props.seoOgDescription - meta Open Graph description (зарезервированная переменная)
		* 		@property {string} props.alternateRu - id альтернативной записи на русском языке (зарезервированная переменная)
		* 		@property {string} props.alternateEn - id альтернативной записи на английском языке (зарезервированная переменная)
		* 		@property {string} props.alternateDe - id альтернативной записи на немецком языке (зарезервированная переменная)
		* 		@property {string} props.seoOgImage - meta Open Graph image (зарезервированная переменная)
		* 		@property {string} props.seoOgImg - meta Open Graph image (зарезервированная переменная)
		* 		@property {string} props.seoRobots - robots param (зарезервированная переменная)
		* 		@property {string} props.seoMicro - микроразметка (зарезервированная переменная)
		* 		@property {boolean} props.imageOgNew - переменная изменяет значение, если добавлено новое изображение seoOgImg (зарезервированная переменная)
		*/
		'props',
		'required'
	],

	// Set data
	data: () => ({
		/**
		* @typedef {Object} Data
		* 	@property {array} titleRules - Правила валидации поля title ( [подробнее]{@link https://vuetifyjs.com/en/components/forms} )
		* 	@property {array} descriptionRules - Правила валидации поля description ( [подробнее]{@link https://vuetifyjs.com/en/components/forms} )
		* 	@property {boolean} imageUploadWindowSeo - Статус отображения окна кропа OG image
		* 	@property {int} cropWidthSeo - Ширина изображения для кропа OG image
		* 	@property {int} cropHeightSeo - Высота изображения для кропа OG image
		* 	@property {array} robots - Варианты для robots
		* 		@property {array} robots.object.text - Текст варианта
		*/
		titleRules: [
			v => !!v || 'Meta tag title - поле обязательно к заполнению',
			v => (v && v.length > 60) || 'Meta tag title должен быть более 60 символов. Введено - ' + v.length
		],
		descriptionRules: [
			v => !!v || 'Meta tag title - поле обязательно к заполнению',
			v => (v && v.length > 120) || 'Meta tag title должен быть более 120 символов. Введено - ' + v.length
		],
		imageUploadWindowSeo: false,
		cropWidthSeo: 1200,
		cropHeightSeo: 1200,
		robots: [
			{text: 'index,follow'},
			{text: 'noindex,follow'},
			{text: 'index,nofollow'},
			{text: 'noindex,nofollow'}
		],

	}),

	// Components
    components: {
		imageCover: cropImage,
    },

	// Methods
	methods: {
		/**
		* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения изображения после кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
		*	@method cropSuccess
		**/
		cropSuccess(imgDataUrl, field){
			this.props.seoOgImage = imgDataUrl;
			this.props.seoOgImg = imgDataUrl;
			this.props.imageOgNew = 'new';
		},
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:components/seo~Component <strong>SEO</strong> mounted
	*/
	mounted: function(){
		this.$log.info('Component \'SEO\' (@/components/seo) - mounted hook init');
	},
}
