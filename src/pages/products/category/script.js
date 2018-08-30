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
	cropWidth: 600,
	cropHeight: 300,
	// Данные категории
	id: 0,
	name: '',
	url: '',
	status: 0,
	posts_count: 0,
	lang: 0,
	link: false,
	imgDataUrl: false,
	seoId: 0,
	img: '',
	imageNew: false,
	seo: {
		seoTitle: '',
		seoDescription: '',
			seoOgTitle: '',
			seoOgDescription: '',
			seoOgImage: '',
			seoOgImg: '',
			seoRobots: '',
			seoMicro: '',
			imageOgNew: false
	}
}

const methods = {
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
            // console.log(response.data)           
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
				this.lang = item.lang
				this.link = parseInt(item.publication)
				this.imgDataUrl = item.img
				this.seoId = item.seo
				this.img = this.imgDataUrl == '' ? false : this.$root.domain + this.imgDataUrl + this.$random();

				this.seo.seoTitle = item.seo_data.title
				this.seo.seoDescription = item.seo_data.description

				this.seo.seoOgTitle = item.seo_data.og_title
				this.seo.seoOgDescription = item.seo_data.og_description
				this.seo.seoOgImage = item.seo_data.og_image
				this.seo.seoOgImg = this.seo.seoOgImage == '' ? false : this.$root.domain + item.seo_data.og_image + this.$root.random();

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
				title: this.seo.seoTitle,
				description: this.seo.seoDescription,
				og_title: this.seo.seoOgTitle,
				og_description: this.seo.seoOgDescription,
				robots: this.seo.seoRobots,
				micro_markup: this.seo.seoMicro,
				og_image: this.seo.seoOgImage,
				img: this.imgDataUrl,
				seoId: this.seoId,
				image_new: this.imageNew,
				image_og_new: this.seo.imageOgNew,
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

                	this.notify = 'Произошла ошибка при загрузке данных...'
                    this.$store.commit('error', response.data.error);
                } else {
					this.$log.debug('page \'Products category\' (@/pages/products/category) - AJAX success');

                    this.$store.commit('success', 'Все отлично сохранилось, можешь спасть спокойно!');
 				}
            });

		} else {
			this.$store.commit('error', {error: 'Исправьте все ошибки в форме'});
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
	*/
	components: {
		imageCover: cropImage,
		seo
	},

	// Head
	metaInfo: {
		title: 'Админ панель - Блог'
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
		
		// Устанавливаем ID категории в переменную
		this.id = this.$route.params.id;
		// Запрашиваем данные категории при загрузке компонента
		const getCategoryData = this.getCategory.bind(this);
		getCategoryData();
	},
	
	/**
	* This page watch:
	*	- variable "name"
	*	- variable "status"
	*/
	watch: {
		name () {
			this.$log.debug('page \'Products category\' (@/pages/products/category) - watch name');
			
			if(this.transliteration) {
				const url = this.$root.translite(this.name);
				this.url = url;
			}
		},
		status (){
			this.$log.debug('page \'Products category\' (@/pages/products/category) - watch status');

			this.statusText = this.status ? 'ON' : 'OFF'
		}
	},
}