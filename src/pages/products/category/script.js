/**
* @vuedoc
* @module pages/products/category
* @see @/pages/products/category
*
* @version 1.0
* @desc Страница редактирования категории блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import tinymce from '@tinymce/tinymce-vue'
import cropImage from 'vue-image-crop-upload'
import seo from '@/components/seo'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} catDataUrl - url для запроса данных категории
	* 	@property {string} catSaveDataUrl - url для сохранения данных категории
	*
	* 	@property {boolean} valid - Валидация (зарезервированная переменная)
	*	@property {boolean} loading - Статус загрузки данных (зарезервированная переменная)
	*	@property {boolean} transliteration - Статус транслитерации url от названия (зарезервированная переменная)
	*	@property {boolean} imageUploadWindow - Статус отображения окна кропа (зарезервированная переменная)
	*
	* 	@property {array} nameRules - Правила валидации поля name ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	* 	@property {array} urlRules - Правила валидации поля url ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	*
	* 	@property {int} step - Шаги заполнения данных (зарезервированная переменная)
	* 	@property {string} statusText - Текст статуса
	* 	@property {int} cropWidth - Ширина изображения для кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	* 	@property {int} cropHeight - Высота изображения для кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	*
	* 	@property {int} id - ID категории в базе данных
	* 	@property {string} name - Название категории
	* 	@property {string} url - URL категории
	* 	@property {int} status - Статус видимости категории на сайте (0|1)
	* 	@property {int} posts_count - Кол-во публикаций в категории
	* 	@property {string|false} imgDataUrl - The datebase64 url of created image
	* 	@property {int} seoId - ID категории в таблице SEO блога
	* 	@property {string} img - Изображение категории
	* 	@property {string} imageNew - Переменная изменяет значение, если добавлено новое изображение img
	*
	*	@property {object} seo - SEO данные категории
	*		@property {string} seo.seoTitle - meta title (зарезервированная переменная)
	*		@property {string} seo.seoDescription - meta description (зарезервированная переменная)
	*		@property {string|false} props.alternateRu - id альтернативной записи на русском языке (зарезервированная переменная)
	*		@property {string|false} props.alternateEn - id альтернативной записи на английском языке (зарезервированная переменная)
	*		@property {string|false} props.alternateDe - id альтернативной записи на немецком языке (зарезервированная переменная)
	*		@property {string} seo.seoOgTitle - meta Open Graph title (зарезервированная переменная)
	*		@property {string} seo.seoOgDescription - meta Open Graph description (зарезервированная переменная)
	*		@property {string} seo.seoOgImage - meta Open Graph image (зарезервированная переменная)
	*		@property {string} seo.seoOgImg - meta Open Graph image (зарезервированная переменная)
	*		@property {string} seo.seoRobots - robots param (зарезервированная переменная)
	*		@property {string} seo.seoMicro - микроразметка (зарезервированная переменная)
	*		@property {boolean} seo.imageOgNew - переменная изменяет значение, если добавлено новое изображение seoOgImg (зарезервированная переменная)
	*
	*/
	catDataUrl: '/products/category/',	
	catSaveDataUrl: '/products/category/save/',
	valid: true,
	loading: true,
	transliteration: false,
	imageUploadWindow: false,
	bannerUploadWindow: false,
	nameRules: [
		v => !!v || 'Назваение обязательно к заполнению',
		v => (v && v.length > 4) || 'Имя должно быть более 4-х символов. Введено - ' + v.length
	],
	urlRules: [
		v => !!v || 'URL обязательно к заполнению',
		v => (v && v.length > 2) || 'URL должно быть более 2-х символов. Введено - ' + v.length
	],
	step: 0,
	statusText: 'OFF',
	cropWidth: 256,
	cropHeight: 257,
	cropBannerWidth: 1280,
	cropBannerHeight: 480,
	// Данные категории
	id: 0,
	name: '',
	url: '',
	status: 0,
	posts_count: 0,
	lang: 0,
	link: false,
	imgDataUrl: false,
	bannerDataUrl: false,
	seoId: 0,
	img: '',
	noBannerSrc: '/assets/images/no_banner.jpg',
	banner: '',
	imageNew: false,
	bannerNew: false,
	seo: {
		seoTitle: '',
		alternateRu: 0,
		alternateEn: 0,
		alternateDe: 0,
		seoDescription: '',
			seoOgTitle: '',
			seoOgDescription: '',
			seoOgImage: '',
			seoOgImg: '',
			seoRobots: '',
			seoMicro: '',
			imageOgNew: false
	},
	access: {
		edit: true
	},

	titleVariants: [{text: 'div'}, {text: 'h1'}, {text: 'h2'}, {text: 'h3'}, {text: 'h4'}],
	titleVariant: 'h1',
	title: '',
	miniDescription: '',
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
	infoDescription: '',
	editorinfoDescription: {
		language_url: '/js/editor/ru.js',
		height: 250,
		menubar: false,
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
		body_class: 'products_category_description'
	}
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Назначение данных страницы
	*	@method mountedPage
	**/
	mountedPage(){
		this.access.edit  = this.$access('edit', true)
		// Устанавливаем ID категории в переменную
		this.id = this.$route.params.id;
		// Запрашиваем данные категории при загрузке компонента
		const getCategoryData = this.getCategory.bind(this);
		this.noBannerSrc = this.$root.domain + this.noBannerSrc;
		getCategoryData();
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос данных категории (AJAX)
	*	@method getCategory
	**/
	getCategory (){
		this.$log.info('page \'Products category\' (@/pages/products/category) - method init');
		
		return this.axios({
            method: 'get',
            url: this.catDataUrl + this.id,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {      
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Products category\' (@/pages/products/category) - AJAX error');

            	this.notify = 'Произошла ошибка при загрузке данных...'
                this.$store.commit('error', response.data.error);
            }
            else {
				this.$log.debug('page \'Products category\' (@/pages/products/category) - AJAX success');

            	const item = response.data.category;

				this.id = item.id
				this.name = item.name
				this.url = item.url
				this.status = parseInt(item.status)
				this.posts_count = item.subcats_count
				this.titleVariant = item.title && item.title.tag ? item.title.tag : 'h1'
				this.title = item.title && item.title.text ? item.title.text : ''
				this.infoDescription = item.description
				this.miniDescription = item.description_mini
				this.lang = item.lang
				this.link = parseInt(item.publication)
				this.imgDataUrl = item.img
				this.bannerDataUrl = item.banner_img
				this.seoId = item.seo
				this.img = this.imgDataUrl == '' ? false : this.$root.domain + this.imgDataUrl + this.$random();
				this.banner = this.bannerDataUrl == '' ? false : this.$root.domain + this.bannerDataUrl + this.$random();

				this.seo.seoTitle = item.seo_data.title
				this.seo.seoDescription = item.seo_data.description


				this.seo.alternateRu = this.lang !== 'ru' ? (item.seo_data.alternate && item.seo_data.alternate.ru ? item.seo_data.alternate.ru : '0') : false
				this.seo.alternateEn = this.lang !== 'en' ? (item.seo_data.alternate && item.seo_data.alternate.en ? item.seo_data.alternate.en : '0') : false
				this.seo.alternateDe = this.lang !== 'de' ? (item.seo_data.alternate && item.seo_data.alternate.de ? item.seo_data.alternate.de : '0') : false

				this.seo.seoOgTitle = item.seo_data.og_title
				this.seo.seoOgDescription = item.seo_data.og_description
				this.seo.seoOgImage = item.seo_data.og_image
				this.seo.seoOgImg = this.seo.seoOgImage == '' ? false : this.$root.domain + item.seo_data.og_image + this.$random();

				this.seo.seoRobots = item.seo_data.robots
				this.seo.seoMicro = item.seo_data.micro_markup
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения изображения после кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	*	@method cropSuccess
	**/
	cropSuccess(imgDataUrl, field){
		this.$log.info('page \'Products category\' (@/pages/products/category) - method init');

		this.imgDataUrl = imgDataUrl;
		this.img = imgDataUrl;
		this.imageNew = 'new';
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения изображения после кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	*	@method cropSuccessBanner
	**/
	cropSuccessBanner(bannerDataUrl, field){
		this.$log.info('page \'Products category\' (@/pages/products/category) - method init');

		this.bannerDataUrl = bannerDataUrl;
		this.banner = bannerDataUrl;
		this.bannerNew = 'new';
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохранение данных категории (AJAX)
	*	@method submit
	**/
	submit() {
		this.$log.info('page \'Products category\' (@/pages/products/category) - method init');

		if(this.$refs.form.validate()){
			this.loading = true;

			const data = {
				name: this.name,
				url: this.url,
				status: this.status,
				posts_count: this.posts_count,
				title_info_tag: this.titleVariant,
				title_info: this.title,
				info: this.infoDescription,
				description_mini: this.miniDescription,
				title: this.seo.seoTitle,
				description: this.seo.seoDescription,
				og_title: this.seo.seoOgTitle,
				og_description: this.seo.seoOgDescription,
				robots: this.seo.seoRobots,
				micro_markup: this.seo.seoMicro,
				og_image: this.seo.seoOgImage,
				img: this.imgDataUrl,
				banner_img: this.bannerDataUrl,
				seoId: this.seoId,
				image_new: this.imageNew,
				banner_new: this.bannerNew,
				image_og_new: this.seo.imageOgNew,
				alternateRu: this.seo.alternateRu ? this.seo.alternateRu : '',
				alternateEn: this.seo.alternateEn ? this.seo.alternateEn : '',
				alternateDe: this.seo.alternateDe ? this.seo.alternateDe : ''
			}

			return this.axios({
                method: 'post',
                url: this.catSaveDataUrl + this.id,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify(data),
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
					this.$log.error('page \'Products category\' (@/pages/products/category) - AJAX error');
					this.$logger('error', 'Произошла ошибка при загрузке категории продукции. Ошибка: ' + response.data.error)
	            	this.$notify.error('Произошла ошибка при загрузке категории продукции.')
	            	console.log(response.data.error);
                } else {
					this.$log.debug('page \'Products category\' (@/pages/products/category) - AJAX success');
                    this.$notify.success('Все отлично сохранилось, можешь спасть спокойно!');
                    this.mountedPage();
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
	data() { return data },

	/**
	* This page requires the components:
	*	- [vue-image-crop-upload]{@link https://github.com/dai-siki/vue-image-crop-upload}
	*	- [Seo component]{@link module:components/seo}
	*	- [TinyMCE]{@link https://github.com/tinymce/tinymce-vue}
	*/
	components: {
		imageCover: cropImage,
		tinymce,
		seo
	},

	// Head
	metaInfo: {
		title: 'Админ панель - Продукция категория'
	},

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Установка переменной id
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрашиваем данные категории при загрузке компонента -> getCategory()
	* @event module:pages/products/category~Page <strong>Products category</strong> mounted
	*/
	mounted: function(){
		this.$log.info('page \'Products category\' (@/pages/products/category) - mounted hook init');
		this.mountedPage()
	},
	
	/**
	* This page watch:
	*	- variable "name"
	*	- variable "status"
	*/
	watch: {
		'$route.params.id'(){
			this.$log.debug('page \'Products category\' (@/pages/products/category) - watch id');
			this.loading = false;
			this.mountedPage();
		},
		name(){
			this.$log.debug('page \'Products category\' (@/pages/products/category) - watch name');
			
			if(this.transliteration) {
				const url = this.$translit(this.name);
				this.url = url;
			}
		},
		status(){
			this.$log.debug('page \'Products category\' (@/pages/products/category) - watch status');

			this.statusText = this.status ? 'ON' : 'OFF'
		}
	},
}