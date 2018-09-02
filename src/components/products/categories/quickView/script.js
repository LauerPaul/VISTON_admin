/**
* @vuedoc
* @module components/blog/categories/quickView
* @see @/components/blog/categories/quickView
*
* @version 1.0
* @desc Компонент быстрого просмотра категории блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} statutsUrlPostprefix - статус видимости - приставка к url (зарезервированная переменная)
	*	@property {string} notify - Текст оповещения (Зарезервированная переменная)
	*	@property {boolean} text - Текст 
	*		@property {boolean} text.quickView - Быстрый просмотр 
	*		@property {boolean} text.currentStatus - Текущий статус отображения на сайте 
	*		@property {boolean} text.hide - Скрыть
	*		@property {boolean} text.visible - Показать
	*		@property {boolean} text.edit - Редактировать
	*		@property {boolean} text.closeWindow - Закрыть окно
	*		@property {boolean} text.editCategory - Редактировать категорию
	*		@property {boolean} text.categoryId - ID категории
	*		@property {boolean} text.categoryName - Название категории
	*		@property {boolean} text.categoryUrl - URL категории
	*		@property {boolean} text.categoryImage - Изображение категории
	*		@property {boolean} text.postsCount - Кол-во публикаций в категории
	*/
	statutsUrlPostprefix: '',
	notify: '',
	text: {
		quickView: 'Быстрый просмотр',
		currentStatus: 'Текущий статус отображения на сайте',
		hide: 'Скрыть',
		visible: 'Показать',
		edit: 'Редактировать',
		closeWindow: 'Закрыть окно',
		editCategory: 'Редактировать категорию',
		categoryId: 'ID категории',
		categoryName: 'Название категории',
		categoryUrl: 'URL категории',
		categoryImage: 'Изображение категории',
		postsCount: 'Кол-во публикаций в категории',
	},
	access:false
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос обновления данных категории (AJAX)
	*	@method updateStatusCategory
	**/
	updateStatusCategory (){
		this.$log.info('component \'Quick view blog category\' (@/components/blog/categories/quickView) - method init');

		if(this.$access('edit')){
			if(this.item.status){
				this.statutsUrlPostprefix = 0;
	        	this.notify = 'Категория не отображается на сайте =('
			}else {
				this.statutsUrlPostprefix = 1;
	        	this.notify = 'Все ок! Категория отображается на сайте =)'
			}

			var url = this.url + this.statutsUrlPostprefix + '/' + this.item.id

			return this.axios({
	            method: 'get',
	            url: url,
	            withCredentials: true,
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            responseType: 'json',
	            data: '',
	        }).then((response) => {
	            if(response.data.status == "ERROR") {
					this.$log.error('component \'Quick view blog category\' (@/components/blog/categories/quickView) - AJAX error');
	                this.$notify.error(response.data.error);
					this.$logger('error', 'Ошибка при попытке изменения статуса видимости категории блога - ' + this.item.name + ' (ID ' + this.item.id + ')')
	            }
	            else {
					this.$log.debug('component \'Quick view blog category\' (@/components/blog/categories/quickView) - AJAX success');
					this.$logger('edit', 'Изменение статуса видимости категории блога - ' + this.item.name + ' (ID ' + this.item.id + ') - значение "' + this.statutsUrlPostprefix + '"')
	                this.$notify.success(this.notify);
	                this.item.status = !this.item.status;
	            }
	        });
		}
	},
}

// Export component
export default {
	// Data
	data: () => (data),

	/**
	* @typedef {Object} Props
	* 	@property {boolean} status - Статус видимости виджета
	* 	@property {boolean} item - Объект с данными
	* 	@property {string} img - Изображение категории
	* 	@property {string} url - url по которому будет выполнятся запрос
	*/
	props: [
		'status',
		'item',
		'img',
		'url',
	],

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/blog/categories/quickView~Component <strong>Quick view blog category</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Quick view blog category\' (@/components/blog/categories/quickView) - mounted hook init');
		this.access = this.$access('edit', true)
	},
}