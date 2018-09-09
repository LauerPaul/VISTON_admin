/**
* @vuedoc
* @module pages/products/articles
* @see @/pages/products/articles
*
* @version 1.0
* @desc Страница списка категории блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import addNewComponent from '@/components/products/categories/new'
import dialogRemove from '@/components/products/dialog-remove'
import statisticWidget from '@/components/products/categories/statistic'
import quickView from '@/components/products/categories/quickView'

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} catsListUrl - url для запроса списка категорий
	* 	@property {string} catRemoveUrl - url для удаления категории
	* 	@property {string} catStatusToggle - url для переключения статуса отображения категории на сайте
	* 	@property {string} catAddNewURL - url для добавления новой категории
	*
	*	@property {boolean} loading - Статус загрузки данных (зарезервированная переменная)
	*	@property {boolean} searchlineShow - Стутс отображения поиска (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {boolean} addNew_window - Статус видимости попап окна новой категории
	*
	*	@property {object} dialogRemove - Параметры для диалогового окна при попытке удалить категорию (компонент [dialog-remove]{@link module:components/products/dialog-remove})
	*		@property {boolean} dialogRemove.status - Статус отображения диалогового окна при попытке уаления категории из списка
	*		@property {boolean} dialogRemove.error - Ошибка (возникает в случае попытки удалить категорию, к которой прикреплены публикации)
	*		@property {string} dialogRemove.url - Ссылка запроса на удаление
	*		@property {string} dialogRemove.title - Заголовок диалогового окна
	*		@property {string} dialogRemove.text - Текст диалогового окна
	*
	*	@property {boolean} sound - Статус звуковых оповещений
	*	@property {boolean} quickView - Статус отображения виджета быстрого просмотра
	*	@property {boolean} statisticWindow - Статус отображения виджета статистики [products category statistic-widgetsc]{@link module:/components/products/categories/statistic}
	*
	*	@property {object} pagination - Параметры пагинации таблицы (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} headers - Параметры таблицы ([подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} selected - Выделенные элементы таблицы
	*	@property {array} categories - Список категорий (Зарезервированная переменная)
	*	@property {array} parents - Список родительских категорий (Зарезервированная переменная)
	*
	*	@property {string} search - Значения поиска (Зарезервированная переменная)
	*	@property {string} img - (Зарезервированная переменная)
	*	@property {string} language - Язык в системе
	* 	@property {int} step - Шаги заполнения данных (зарезервированная переменная)
	*
	*	@property {object} selectItem - Данные выбранной категории (зарезервированная переменная)
	*		@property {object} selectItem.id - ID категории (зарезервированная переменная)
	*
	*/
	catsListUrl: '/products/categories/articles/',
	catRemoveUrl: '/products/categories/remove/',
	catStatusToggle: '/products/categories/status/',
	catAddNewURL: '/products/category/new/articles/',

	access: {
		edit: true,
		remove: true,
		add: true,
		quickView: true
	},
	
	loading: true,
	searchlineShow: false,
	addNew_window: false,
	dialogRemove: {
		status: false,
		error: false,
		url: '',
		title: '',
		text: ''
	},
	sound: true,
    quickView: false,
	statisticWindow: true,

	pagination: {sortBy: 'id'},
	headers: [
		{ text: 'ID', value: 'id' },
		{
			text: 'Название',
			align: 'left',
			value: 'name'
		},
		{ text: 'ID кат-и', align: 'center', value: 'parent_id' },
		{ text: 'Статус', value: 'status', align: 'left' },
		{ text: '', value: '', sortable: false }
	],
	selected: [],
	parents: [],
	categories: [],
	img: '',
	language: '',
	step: 'ru',

	search: '',
	
    selectItem: {id: 0},
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос списка категорий блога (AJAX)
	*	@method getUsersList
	**/
	getCategories (lng=false){
		this.$log.info('page \'products articles\' (@/pages/products/articles) - method init');

		if(this.$access('access')){
			var url = !lng ? this.catsListUrl : '/' + lng + this.catsListUrl;
			
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
					this.$log.error('page \'products articles\' (@/pages/products/articles) - AJAX error');
					this.$logger('error', 'Произошла ошибка при загрузке категорий продукции. Ошибка: ' + response.data.error)
	            	this.$notify.error('Произошла ошибка при загрузке категорий продукции.')
	            	console.log(response.data.error);
	            }else {
					this.$log.debug('page \'products articles\' (@/pages/products/articles) - AJAX success');
	                this.parents = response.data.parents;
	                this.categories = response.data.categories;
	                this.language = response.data.language;
	            }
	        });
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение статуса видимости поиска по таблице
	*	@method toggleSearch
	**/
	toggleSearch (){
		this.$log.info('page \'products articles\' (@/pages/products/articles) - method init');

		if(this.searchlineShow) this.search = ''
		this.searchlineShow = !this.searchlineShow;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сортировка таблицы
	*	@method changeSort
	**/
	changeSort (column) {
		this.$log.info('page \'products articles\' (@/pages/products/articles) - method init');

		if (this.pagination.sortBy === column) {
			this.pagination.descending = !this.pagination.descending
		} else {
			this.pagination.sortBy = column
			this.pagination.descending = false
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Всплывающее окно при попытке удаления категории
	*	@method removeAlert
	**/
	removeAlert (){
		this.$log.info('page \'products articles\' (@/pages/products/articles) - method init');
		
		if(this.$access('remove')){
			this.dialogRemove.url = this.catRemoveUrl + this.selectItem.id

			if(parseInt(this.selectItem.parent_id) == 0){
				this.dialogRemove.error = false
				this.dialogRemove.title = 'ПОДТВЕРДИТЕ ДЕЙСТВИЕ'
				this.dialogRemove.text = 'Вы действительно хотите удалить публикацию продукции с названием<br><strong>"'+ this.selectItem.name +'"</strong> - <strong>ID '+ this.selectItem.id +'</strong>? <br> <br> Публикация будет удалена, категория - выключена из видимости на сайте.'
			}else {
				this.dialogRemove.error = false
				this.dialogRemove.title = 'ПОДТВЕРДИТЕ ДЕЙСТВИЕ'
				this.dialogRemove.text = 'Вы действительно хотите удалить публикацию продукции с названием<br><strong>"'+ this.selectItem.name +'"</strong> - <strong>ID '+ this.selectItem.id +'</strong>?'
			}

			this.dialogRemove.status = true;
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выполняется при успешном удалении элемента
	*	@method removeSuccess
	**/
	removeSuccess(error){
		this.dialogRemove.status = false;
		this.getCategories();
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выбор категории
	*	@param item {object} - назначение данных выбранной категории переменной **selectItem**
	*	@method setSelectItem
	**/
	setSelectItem (item, index){
		this.$log.info('page \'products articles\' (@/pages/products/articles) - method init');

		this.selectItem = item;
		this.selectItem.index = index
		this.img = this.$root.domain + this.selectItem.img;
		if(this.selectItem.status == '0' || this.selectItem.status == 0) this.selectItem.status = false
		else this.selectItem.status = true
	}
}

/** Export component */
export default {
	// Set data
	data: function() { return data },

	// Methods
	methods: methods,

	// Head
	metaInfo: {
		title: 'Админ панель - Продукция категории'
	},

	/**
	* Данная страница использует компоненты:
	*	
	*	> [products add-new]{@link module:components/products/categories/new}
	*	> [products dialog-remove]{@link module:components/products/dialog-remove}
	*	> [products category statistic-widget]{@link module:/components/products/categories/statistic}
	*	> [Quick view category widget]{@link module:/components/products/categories/quickView}
	*/
	components: {
		'add-new' : addNewComponent,
		'dialog-remove' : dialogRemove,
		'statistic-widget' : statisticWidget,
		'quick-view' : quickView,
	},

	/**
	* @desc ▶ Hook reporting
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрашиваем список категорий при загрузке компонента -> getCategories()
	* @event module:pages/products/articles~Page <strong>products articles</strong> mounted
	*/
	mounted: function () {
		this.$log.info('page \'products articles\' (@/pages/products/articles) - mounted hook init');
		
		// Избавляемся от кеша
		this.addNew_window = false
		// Запрашиваем список категорий при загрузке компонента
		this.getCategories();

		this.access.edit  = this.$access('edit', true)
		this.access.remove = this.$access('remove', true)
		this.access.add = this.$access('add', true)

		console.log(this.access);
	},
}