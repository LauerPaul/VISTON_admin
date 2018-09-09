/**
* @vuedoc
* @module components/blog/dialog-remove
* @see @/components/blog/dialog-remove
*
* @version 1.0
* @desc Диалоговое окно возникает при удалении элементов блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
const data = {
	/**
	* @typedef {Object} Data
	*	@property {string} text - Текст
	*		@property {string} text.cancel - Текст кнопки "Отмена"
	*		@property {string} text.ok - Текст кнопки "Ок"
	*/
	text: {
		cancel: 'Отмена',
		ok: 'Да'
	}
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос на удаление элемента блога (AJAX)
	*	@method removeItem
	**/
	removeItem (){
		this.$log.info('page \'Blog dialog-remove\' (@/components/blog/dialog-remove) - method init');

		if(this.$access('remove')){
			console.log(this.category);
			return this.axios({
	            method: 'post',
	            url: this.url,
	            withCredentials: true,
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            responseType: 'json',
	            data: this.$root.querystring.stringify({
	            										seo: this.seoId,
	            										img: this.img,
														banner_img: this.banner_img,
														article: this.article,
														category_link: this.category
	            									}),
	        }).then((response) => {
	            this.loading = false;

	            if(response.data.status == "ERROR") {
					this.$log.error('page \'Blog dialog-remove\' (@/components/blog/dialog-remove) - AJAX error');
					this.$logger('error', 'Удаление элемента блога - ' + this.name + '. Ошибка: ' + response.data.error)

	                this.$notify.error(response.data.error);
	            }
	            else {
					this.$log.debug('page \'Blog dialog-remove\' (@/components/blog/dialog-remove) - AJAX success');
					this.$logger('remove', 'Удален элемент блога - ' + this.name)
					this.$emit('ok')

	                this.$notify.success('Операция выполнена успешно.');
	            }
	        });
		}else {
			this.$emit('ok', true)
		}
	},
}

// Export component
export default {
	// Data
	data: () => (data),

	/**
	* @typedef {Object} Props
	* 	@property {int} seoId - Ключ в таблице SEO
	* 	@property {boolean} status - Статус видимости модуля
	* 	@property {string} url - url по которому будет отправлен запрос
	* 	@property {string} name - название элемента (для записи в лог)
	* 	@property {int} article - ID публикации
	* 	@property {boolean} error - ошибка (мпользуется, чтоб скрыть кнопку "ок" и запретить отправку AJAX запроса)
	* 	@property {object} content - Текст
	* 		@property {string} content.title - Заголовок
	* 		@property {string} content.text - Текст
	*/
	props: [
		'status',
		'url',
		'name',
		'content',
		'error',
		'seoId',
		'img',
		'banner_img',
		'article',
		'category'
	],

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/blog/dialog-remove~Component <strong>Blog dialog-remove</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Blog dialog-remove\' (@/components/blog/dialog-remove) - mounted hook init');
	},

	watch: {
		'status': function(){
			if(this.status && this.$store.state.Auth.config.sound) this.$sound.error()
		}
	}

}