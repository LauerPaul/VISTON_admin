/**
* @vuedoc
* @module pages/vacancy/seo
* @see @/pages/vacancy/seo
*
* @version 1.0
* @desc Страница настроек SEO страницы продукции
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import seo from '@/components/seo/'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} urlGetSeo - url для загрузки seo данных категории
	*
	* 	@property {boolean} valid - Валидация (зарезервированная переменная)
	*	@property {boolean} loading - Статус загрузки таблицы
	*	@property {int} status - Статус активности категории (1|0)
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
	urlGetSeo: '/vacancy/seo/',
	valid: true,
	loading: true,
	status: 1,
	seoId: 0,
	seo: {
		// ------------
		// SEO
		// ------------
		seoTitle: '',				// Title
		seoDescription: '',			// Description
		// ------------
		// Open graph
		// ------------
		seoOgTitle: '',				// OG Title
		seoOgDescription: '',		// OG Description
		seoOgImage: '',				// OG Image
		seoOgImg: '',
		seoRobots: '',				// robots
		seoMicro: '',				// micro markup
		imageOgNew: false
	},
	step: 'en',
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос SEO-данных категории (AJAX)
	*	@method getSeo
	**/
	getSeo (lng = false){
		this.$log.info('page \'Vacancy page SEO\' (@/pages/vacancy/seo) - method init');
		var url = !lng ? this.urlGetSeo : '/' + lng + this.urlGetSeo;
		
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
				this.$log.error('page \'Vacancy page SEO\' (@/pages/vacancy/seo) - AJAX error (GET)');
                this.$logger('error', 'Произошла ошибка при загрузке SEO продукции. Ошибка: ' + response.data.error)
            	this.$notify.error('Произошла ошибка при загрузке SEO данных...')
            }
            else {
				this.$log.debug('page \'Vacancy page SEO\' (@/pages/vacancy/seo) - AJAX success');

            	this.seoId = response.data.data.id
				this.seo.seoTitle = response.data.data.title
				this.seo.seoDescription = response.data.data.description
				this.seo.seoOgTitle = response.data.data.og_title
				this.seo.seoOgDescription = response.data.data.og_description
				this.seo.seoOgImage = response.data.data.og_image
				this.seo.seoRobots = response.data.data.robots
				this.seo.seoMicro = response.data.data.micro_markup
				this.seo.seoOgImg = this.seo.seoOgImage == '' ? false : this.$root.domain + this.seo.seoOgImage + '?' + Math.floor((Math.random() * ((777 + 1) - 55)) + 99999);
				this.step = response.data.lang
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сохранение SEO данных категории (AJAX)
	*	@method submit
	**/
	submit() {
		this.$log.info('page \'Vacancy page SEO\' (@/pages/vacancy/seo) - method init');
		
		if(this.$refs.form.validate()){
			this.loading = true;

			const data = {
				id: this.seoId,
				title: this.seo.seoTitle,
				description: this.seo.seoDescription,
				
				og_title: this.seo.seoOgTitle,
				og_description: this.seo.seoOgDescription,
				og_image: this.seo.seoOgImage,
				image_og_new: this.seo.imageOgNew,
				robots: this.seo.seoRobots,
				micro_markup: this.seo.seoMicro,
			}

			return this.axios({
                method: 'post',
                url: this.urlGetSeo + 'save/',
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify(data),
            }).then((response) => {
                this.loading = false;

                if(response.data.status == "ERROR") {
					this.$log.error('page \'Vacancy page SEO\' (@/pages/vacancy/seo) - AJAX error');
                    this.$logger('error', 'Произошла ошибка при сохранении SEO продукции. Ошибка: ' + response.data.error)
                	this.$notify.error('Произошла ошибка при сохранении SEO данных...')
	            	console.log(response.data.error);
                } else {
					this.$log.debug('page \'Vacancy page SEO\' (@/pages/vacancy/seo) - AJAX success');
                    this.$notify.success('SEO в норме!');
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
	*	- [Seo component]{@link module:components/seo}
	*/
	components: {
		seo
	},

	// Head
	metaInfo: {
		title: 'Админ панель - Блог SEO'
	},

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода getSeo()
	* @event module:pages/vacancy/seo~Page <strong>Vacancy page SEO</strong> mounted
	*/
	mounted: function(){
		this.$log.info('page \'Vacancy page SEO\' (@/pages/vacancy/seo) - mounted hook init');
		
		this.getSeo();
	},
}