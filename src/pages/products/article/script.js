/**
* @vuedoc
* @module pages/products/article
* @see @/pages/products/article
*
* @version 1.0
* @desc Страница редактирования категории блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import tinymce from '@tinymce/tinymce-vue'
import cropImage from 'vue-image-crop-upload'
import primary from '@/components/products/primary_info'
import seo from '@/components/seo'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} catDataUrl - url для запроса данных категории
	* 	@property {string} catSaveDataUrl - url для сохранения данных категории
	*
	* 	@property {boolean} valid - Валидация (зарезервированная переменная)
	*	@property {boolean} loading - Статус загрузки данных (зарезервированная переменная)
	*
	* 	@property {int} step - Шаги заполнения данных (зарезервированная переменная)
	* 	@property {string} statusText - Текст статуса
	*
	* 	@property {int} id - ID категории в базе данных
	* 	@property {int} posts_count - Кол-во публикаций в категории
	* 	@property {int} seoId - ID категории в таблице SEO блога
	* 	@property {int} publicationID - ID данных страницы в таблице
	*
	*	@property {object} primary - SEO данные категории
	* 		@property {string} primary.name - Название категории
	* 		@property {string} primary.url - URL категории
	* 		@property {int} primary.status - Статус видимости категории на сайте (0|1)
	* 		@property {string} primary.miniDescription - краткое описание
	* 		@property {string|false} primary.imgDataUrl - The datebase64 url of created image
	* 		@property {string} primary.img - Изображение категории
	* 		@property {int} primary.cropWidth - Ширина изображения для кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	* 		@property {int} primary.cropHeight - Высота изображения для кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	* 		@property {string} primary.imageNew - Переменная изменяет значение, если добавлено новое изображение img
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
	bannerUploadWindow: false,
	step: 0,
	statusText: 'OFF',
	cropBannerWidth: 1280,
	cropBannerHeight: 480,
	// Данные категории
	id: 0,
	posts_count: 0,
	lang: 0,
	link: false,
	bannerDataUrl: false,
	seoId: 0,
	publicationID: 0,
	noBannerSrc: '/assets/images/no_banner.jpg',
	banner: '',
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
	primary: {
		name: '',
		url: '',
		img: '',
		status: 0,
		miniDescription: '',
		imgDataUrl: false,
		cropWidth: 256,
		cropHeight: 227,
		imageNew: false,
	},
	access: {
		edit: true
	},
	options: false,
	options_: '',
	titleVariants: [{text: 'div'}, {text: 'h1'}, {text: 'h2'}, {text: 'h3'}, {text: 'h4'}],
	titleVariant: 'h1',
	title: '',
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
		this.$log.info('page \'Products article\' (@/pages/products/article) - method init');
		
		return this.axios({
            method: 'get',
            url: this.catDataUrl + this.id + '/article/',
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {      
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Products article\' (@/pages/products/article) - AJAX error');

            	this.notify = 'Произошла ошибка при загрузке данных...'
                this.$store.commit('error', response.data.error);
            }
            else {
				this.$log.debug('page \'Products article\' (@/pages/products/article) - AJAX success');

            	const item = response.data.category;

				this.id = item.id
				this.primary.name = item.name
				this.primary.url = item.url
				this.primary.status = parseInt(item.status)
				this.posts_count = item.subcats_count
				this.titleVariant = item.title && item.title.tag ? item.title.tag : 'h1'
				this.title = item.title && item.title.text ? item.title.text : ''
				this.infoDescription = item.data.text
				this.primary.miniDescription = item.description_mini
				this.lang = item.lang
				this.link = parseInt(item.publication)
				this.primary.imgDataUrl = item.img
				this.bannerDataUrl = item.data.image
				this.seoId = item.seo
				this.publicationID = item.publication_id
				this.primary.img = this.primary.imgDataUrl == '' ? false : this.$root.domain + this.primary.imgDataUrl + this.$random();
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
				this.options = item.data.options
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения изображения после кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	*	@method cropSuccessBanner
	**/
	cropSuccessBanner(bannerDataUrl, field){
		this.$log.info('page \'Products article\' (@/pages/products/article) - method init');

		this.bannerDataUrl = bannerDataUrl;
		this.banner = bannerDataUrl;
		this.bannerNew = 'new';
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция добавления новой опции
	*	@method addOption
	**/
	addOption(){
		this.$log.info('page \'Products article\' (@/pages/products/article) - method init');
		if(this.options[this.options.length-1].data.length && this.options[this.options.length-1].name.length)
			this.options.push({name: '', data: ''})
		// console.log(toString(this.options));
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция добавления новой опции
	*	@method removeOption
	**/
	removeOption(index){
		this.$log.info('page \'Products article\' (@/pages/products/article) - method init');
		this.options.splice(index, 1);
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция добавления новой опции
	*	@method optionsString
	**/
	optionsString(){
		this.$log.info('page \'Products article\' (@/pages/products/article) - method init');
		if(this.options) {
			this.options.forEach( (element, index) => {
				if(!this.options_) this.options_ = '['; else this.options_ += ','; 
				this.options_ += '{"name":"' + element.name + '","data":"' + element.data + '"}'
			});
			this.options_ += ']';
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохранение данных категории (AJAX)
	*	@method submit
	**/
	submit() {
		this.$log.info('page \'Products article\' (@/pages/products/article) - method init');

		if(this.$refs.form.validate()){
			this.loading = true;

			if(this.options) this.optionsString();

			const data = {
				name: this.primary.name,
				url: this.primary.url,
				status: this.primary.status,
				posts_count: this.posts_count,
				options: this.options_,
				// title_info_tag: this.titleVariant,
				// title_info: this.title,
				info: this.infoDescription,
				description_mini: this.primary.miniDescription,
				title: this.seo.seoTitle,
				description: this.seo.seoDescription,
				og_title: this.seo.seoOgTitle,
				og_description: this.seo.seoOgDescription,
				robots: this.seo.seoRobots,
				micro_markup: this.seo.seoMicro,
				og_image: this.seo.seoOgImage,
				img: this.primary.imgDataUrl,
				banner_img: this.bannerDataUrl,
				seoId: this.seoId,
				publicationID: this.publicationID,
				image_new: this.primary.imageNew,
				banner_new: this.bannerNew,
				image_og_new: this.seo.imageOgNew,
				alternateRu: this.seo.alternateRu ? this.seo.alternateRu : '',
				alternateEn: this.seo.alternateEn ? this.seo.alternateEn : '',
				alternateDe: this.seo.alternateDe ? this.seo.alternateDe : ''
			}

			return this.axios({
                method: 'post',
                url: this.catSaveDataUrl + this.id + '/article/',
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify(data),
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
					this.$log.error('page \'Products article\' (@/pages/products/article) - AJAX error');
					this.$logger('error', 'Произошла ошибка при загрузке категории продукции. Ошибка: ' + response.data.error)
	            	this.$notify.error('Произошла ошибка при загрузке категории продукции.')
	            	console.log(response.data.error);
                } else {
					this.$log.debug('page \'Products article\' (@/pages/products/article) - AJAX success');
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
	*	- [TinyMCE]{@link https://github.com/tinymce/tinymce-vue}
	*	- [Seo component]{@link module:components/seo}
	*	- [Products primary info]{@link module:components/products/primary}
	*/
	components: {
		imageCover: cropImage,
		tinymce,
		seo,
		'primary-case': primary
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
	* @event module:pages/products/article~Page <strong>Products article</strong> mounted
	*/
	mounted: function(){
		this.$log.info('page \'Products article\' (@/pages/products/article) - mounted hook init');
		this.mountedPage()
	},
	
	/**
	* This page watch:
	*	- variable "name"
	*	- variable "status"
	*/
	watch: {
		'$route.params.id'(){
			this.$log.debug('page \'Products article\' (@/pages/products/article) - watch id');
			this.loading = false;
			this.mountedPage();
		},
		'primary.status': function() {
			this.$log.debug('page \'Products article\' (@/pages/products/article) - watch status');

			this.statusText = this.primary.status ? 'ON' : 'OFF'
		},
	},
}