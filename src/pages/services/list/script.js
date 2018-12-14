/**
* @vuedoc
* @module pages/services/list
* @see @/pages/services/list
*
* @version 1.0
* @desc Страница списка услуг
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import dialogRemove from '@/components/products/dialog-remove'
import addNewComponent from '@/components/products/categories/new'
import statisticWidget from '@/components/products/categories/statistic'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} urlGet - url для запроса данных
	* 	@property {string} removeItemUrl - url для запроса удаления записи
	*	@property {boolean} loading - Статус загрузки данных (зарезервированная переменная)
	*	@property {boolean} addNew_window - Статус видимости попап окна новой категории
	*	@property {boolean} statisticWindow - Статус отображения виджета статистики [products category statistic-widgetsc]{@link module:/components/products/categories/statistic}
	*
	*	@property {object} pagination - Параметры пагинации таблицы (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {boolean} searchlineShow - Стутс отображения поиска (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {string} search - Значения поиска (Зарезервированная переменная)
	* 	@property {int} step - Шаги заполнения данных (зарезервированная переменная)
	*	@property {boolean} sound - Статус звуковых оповещений
	*	@property {boolean} quickView - Статус отображения виджета быстрого просмотра
	*	@property {string} img - (Зарезервированная переменная)
	*
	*	@property {array} headers - Параметры таблицы ([подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} selected - Выделенные элементы таблицы
	*	@property {array} services - Список услуг (Зарезервированная переменная)
	*
	*	@property {object} dialogRemove - Параметры для диалогового окна при попытке удалить категорию (компонент [dialog-remove]{@link module:components/products/dialog-remove})
	*		@property {boolean} dialogRemove.status - Статус отображения диалогового окна при попытке уаления категории из списка
	*		@property {boolean} dialogRemove.error - Ошибка (возникает в случае попытки удалить категорию, к которой прикреплены публикации)
	*		@property {string} dialogRemove.url - Ссылка запроса на удаление
	*		@property {string} dialogRemove.title - Заголовок диалогового окна
	*		@property {string} dialogRemove.text - Текст диалогового окна
	*
	*	@property {object} selectItem - Данные выбранной категории (зарезервированная переменная)
	*		@property {object} selectItem.id - ID категории (зарезервированная переменная)
	*
	*/
	urlGet: '/services/list/',
	removeItemUrl: '/services/remove/',
	newItemUrl: '/services/new/',
	loading: true,

	pagination: {sortBy: 'id'},
	searchlineShow: false,
	search: '',
	step: 'ru',
	sound: true,
	statisticWindow: true,
    quickView: false,
	addNew_window: false,
	img: '',
	dialogRemove: {
		status: false,
		error: false,
		url: '',
		title: '',
		text: ''
	},
	access: {
		edit: true,
		remove: true,
		add: true
	},
	headers: [
		{ text: 'ID', value: 'id' },
		{
			text: 'Название',
			align: 'left',
			value: 'title'
		},
		{ text: 'Sort', align: 'center', value: 'sort' },
		{ text: 'Статус', value: 'status', align: 'left' },
		{ text: '', value: '', sortable: false }
	],
	selected: [],
	services: [],
    selectItem: {id: 0},
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос данных (AJAX)
	*	@method getList
	**/
	getList(lng=false){
		this.$log.info('page \'Services list\' (@/pages/services/list) - method init');
		var url = !lng ? '/' + this.step + this.urlGet : '/' + lng + this.urlGet;

		if(this.$access('access')){
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
					this.$log.error('page \'Services list\' (@/pages/services/list) - AJAX error');

	            	this.notify = 'Произошла ошибка при загрузке данных...'
	                this.$store.commit('error', response.data.error);
	            }
	            else {
					this.$log.debug('page \'Services list\' (@/pages/services/list) - AJAX success');
					this.services = response.data.data
					console.log(this.services);
	            }
	        });
	    }
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение статуса видимости поиска по таблице
	*	@method toggleSearch
	**/
	toggleSearch(){
		this.$log.info('page \'Services list\' (@/pages/services/list) - method init');

		if(this.searchlineShow) this.search = ''
		this.searchlineShow = !this.searchlineShow;
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выбор категории
	*	@param item {object} - назначение данных выбранной категории переменной **selectItem**
	*	@method setSelectItem
	**/
	setSelectItem (item, index){
		this.$log.info('page \'Services list\' (@/pages/services/list) - method init');

		this.selectItem = item;
		this.selectItem.index = index
		this.img = this.$root.domain + this.selectItem.image;
		if(this.selectItem.status == '0' || this.selectItem.status == 0) this.selectItem.status = false
		else this.selectItem.status = true
		console.log(this.selectItem);
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Всплывающее окно при попытке удаления категории
	*	@method removeAlert
	**/
	removeAlert(){
		this.$log.info('page \'Services list\' (@/pages/services/list) - method init');
		
		if(this.$access('remove')){
			this.dialogRemove.url = this.removeItemUrl + this.selectItem.id + '/'

			this.dialogRemove.error = false
			this.dialogRemove.title = 'ПОДТВЕРДИТЕ ДЕЙСТВИЕ'
			this.dialogRemove.text = 'Вы действительно хотите удалить запись услуги с названием<br><strong>"'+ this.selectItem.title +'"</strong> - <strong>ID '+ this.selectItem.id +'</strong>? <br> <br> Запись будет удалена без возможности восстановления.'

			this.dialogRemove.status = true;
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выполняется при успешном удалении элемента
	*	@method removeSuccess
	**/
	removeSuccess(error){
		this.dialogRemove.status = false;
		this.getList();
	},
}


/** Export component */
export default {
	// Set data
	data: function(){ return data },

	/**
	* Данная страница использует компоненты:
	*	
	*	> [products add-new]{@link module:components/products/categories/new}
	*	> [products dialog-remove]{@link module:components/products/dialog-remove}
	*/
	components: {
		'add-new' : addNewComponent,
		'dialog-remove' : dialogRemove,
		'statistic-widget' : statisticWidget,
	},

	// Method
	methods: methods,

	// Head
	metaInfo: {
		title: 'Админ панель - Услуги'
	},


	/**
	* @desc ▶ Hook reporting
	* @event module:pages/services/list~Page <strong>Services list</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Services list\' (@/pages/services/list) - mounted hook init');
		this.access.edit  = this.$access('edit', true)
		this.access.remove = this.$access('remove', true)
		this.access.add = this.$access('add', true)
		this.getList();
	},
}