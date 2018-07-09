/**
* @vuedoc
* @exports pages/users
* @see @/pages/users
*
* @version 1.0
* @desc Страница списка пользователей (Users)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	* 	@property {string} usersListUrl - url для запроса списка пользователей
	* 	@property {string} usersStatisticUrl - url для запроса статистики по пользователям
	*
	*	@property {boolean} loading - Статус загрузки таблицы
	*	@property {boolean} addNew - Статус видимости попап окна новой категории
	*	@property {boolean} searchlineShow - Стутс отображения поиска (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {boolean} dialogRemoveItem - Статус отображения диалогового окна при попытке уаления пользователя из списка
	*	@property {boolean} sound - Статус звуковых оповещений
	*	@property {boolean} quickView - Статус отображения виджета быстрого просмотра
	*	@property {boolean} statisticWindow - Статус отображения статистики
	*
	*	@property {string} titleTable - Заголовок таблицы
	*	@property {object} pagination - Параметры пагинации таблицы (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} selected - Выделенные элементы таблицы
	*	@property {array} headers - Параметры таблицы ([подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} users - Список пользователей (Зарезервированная переменная)
	*
	*	@property {string} search - Значения поиска (Зарезервированная переменная)
	*	@property {string} notify - Текст оповещения (Зарезервированная переменная)
	*	@property {string} newName - Название новой категори (Зарезервированная переменная)
	*	@property {string} img - (Зарезервированная переменная)
	*
	*	@property {object} statistics - Статистика по пользователям
	*		@property {int} statistics.all - Всего пользователей (Зарезервированная переменная)
	*		@property {int} statistics.admin - Кол-во администраторов (Зарезервированная переменная)
	*		@property {int} statistics.manager - Кол-во менеджеров (Зарезервированная переменная)
	*		@property {int} statistics.seo - Кол-во SEO-специалистов (Зарезервированная переменная)
	*		@property {int} statistics.moderator - Кол-во модераторов (Зарезервированная переменная)
	*		@property {int} statistics.clients - Кол-во клиентов (Зарезервированная переменная)
	*		@property {int} statistics.enabled - Кол-во активных учетных записей (Зарезервированная переменная)
	*		@property {int} statistics.disabled - Кол-во отключенных учетных записей (Зарезервированная переменная)
	*
	*	@property {object} selectUser - Данные выбранного пользователя (зарезервированная переменная)
	*		@property {int} selectUser.id - ID пользователя (зарезервированная переменная)
	*		@property {object} selectUser.user - Данные пользователя (зарезервированная переменная)
	*			@property {int} selectUser.user.is_enabled - Статус активности уч. записи (зарезервированная переменная)
	*
	*/
	// [подробнее]{@link https://vuetifyjs.com/en/components/data-tables}
	usersListUrl: '/users',
	usersStatisticUrl: '/users/statistic',

	loading: true,
	addNew: false,
	searchlineShow: false,
	dialogRemoveItem: false,
	sound: true,
    quickView: false,
	statisticWindow: false,
	
	titleTable: '',
	pagination: {sortBy: 'id'},
	selected: [],
	headers: [],
	users: [],

	search: '',
	notify: '',
	newName: '',
	img: '',
	
	statistics: {
		all: 0,
		admin: 0,
		manager: 0,
		seo: 0,
		moderator: 0,
		clients: 0,
		enabled: 0,
		disabled: 0
	},

    selectUser: {
	    			id: 0,
					user: {
						is_enabled: 0
					}
				},
}


const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос списка пользователей (AJAX)
	*	@method getUsersList
	**/
	getUsersList() {
		this.$log.info('page \'Users\' (@/pages/users) - method init');
		
		return this.axios({
            method: 'get',
            url: this.usersListUrl,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            if(response.data.status == "ERROR") {
				this.$log.error('page \'Users\' (@/pages/users) - AJAX error');

            	if(response.data.action == 'logout') this.$store.commit('logout');
                this.$store.commit('error', response.data);
            }else {
				this.$log.debug('page \'Users\' (@/pages/users) - AJAX success');

                this.users = response.data.users;
				this.getStatistics();
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос статистики по пользователям (AJAX)
	*	@method getStatistics
	**/
	getStatistics() {
		this.$store.commit('getAccessAction', [1, 3]);
		this.$log.debug('page \'Users\' (@/pages/users) - method init');
		
		return this.axios({
            method: 'get',
            url: this.usersStatisticUrl,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Users\' (@/pages/users) - AJAX error');
		
            	if(response.data.action == 'logout') this.$store.commit('logout');
                this.$store.commit('error', response.data);
            }
            else {
				this.$log.debug('page \'Users\' (@/pages/users) - AJAX success');

                this.statistics.admin = response.data.statistic.admin
				this.statistics.moderator = response.data.statistic.moderator
				this.statistics.manager = response.data.statistic.manager
				this.statistics.seo = response.data.statistic.seo
				this.statistics.all = response.data.statistic.all
				this.statistics.clients = response.data.statistic.clients
				this.statistics.enabled = response.data.statistic.enabled
				this.statistics.disabled = response.data.statistic.disabled
				this.statisticWindow = true;
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение статуса видимости поиска по таблице
	*	@method toggleSearch
	**/
	toggleSearch() {
		this.$log.debug('page \'Users\' (@/pages/users) - method init');
		
		if(this.searchlineShow) this.search = ''
		this.searchlineShow = !this.searchlineShow;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выбор пользователя
	*
	*	@param item {object} - Данные выбранного пользователя
	*	@method setSelectUser
	**/
	setSelectUser(item) {
		this.$log.debug('page \'Users\' (@/pages/users) - method init');
		
		this.selectUser = item;
		console.log(this.selectUser);
		this.img = this.selectUser.photo + this.$root.random();
		if(this.selectUser.user.is_enabled == '0' || this.selectUser.user.is_enabled == 0) this.selectUser.user.is_enabled = false
		else this.selectUser.user.is_enabled = true
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Назначаем headers для таблицы, в зависимости от прав пользователя
	*	@method setTableHeaders
	**/
	setTableHeaders() {
		this.$log.debug('page \'Users\' (@/pages/users) - method init');

		if(this.$store.state.Auth.isAdmin){
			this.headers = [
				{ text: 'ID', value: 'user_id' },
				{ text: ' ', value: 'is_enabled', sortable: false  },
				{
					text: 'Имя',
					align: 'left',
					value: 'last_name'
				},
				{ text: 'Status', value: 'is_enabled', sortable: false  },
				{ text: 'Телефон', value: 'phone', align: 'left', sortable: false },
				{ text: '', value: '', sortable: false }
			]
		}else {
			this.headers = [
				{ text: 'ID', value: 'user_id' },
				{ text: ' ', value: 'is_enabled', sortable: false  },
				{
					text: 'Имя',
					align: 'left',
					value: 'last_name'
				},
				{ text: 'Телефон', value: 'phone', align: 'left', sortable: false },
				{ text: '', value: '', sortable: false }
			]
		}
	}
}

/** Export component */
export default {
	
	// Set data
	data() { return data },
	
	/**
	* This module requires the components:
	*
	*/
	components: {},

	/**
	* @desc ▶ Hook reporting <br>
	*
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода setTableHeaders()
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода getUsersList()
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Определяем правила доступа:
	* 	> 1 - Admin
	* 	> 2 - Moderator
	* 	> 3 - Manager
	* 	> 4 - SEO
	* @example
	* 	this.$store.commit('getAccess', [1,2,3]);
	*
	* @event module:pages/users~Page <strong>Users</strong> mounted
	*/
	mounted: function(){
		this.$log.info('page \'Users\' (@/pages/users) - mounted hook init');

		// Устанавливаем загловок
		this.titleTable = (this.$store.state.Auth.isAdmin ? 'Пользователи' : 'Клиенты');
		// Назначаем headers для таблицы, в зависимости от прав пользователя
		this.setTableHeaders();
		// Определяем правила доступа
		this.$store.commit('getAccess', [1,2,3]);
		// Запрашиваем список пользователей
		this.getUsersList();
	},

	// Methods
	methods: methods,
}