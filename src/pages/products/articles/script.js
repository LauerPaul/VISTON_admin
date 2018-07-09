/**
* @vuedoc
* @module pages/blog/articles
* @see @/pages/blog/articles
*
* @version 1.0
* @desc Страница списка публикаций блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	*
	* 	@property {string} postsListUrl - url для запроса списка публикаций
	* 	@property {string} postRemoveUrl - url для запроса удаления публикации
	* 	@property {string} postStatusToggle - url для запроса переключения статуса отображения публикации на сайте
	* 	@property {string} postAddNewURL - url для запроса добавления новой публикации
	* 	@property {string} statutsUrlPostprefix - статус видимости - приставка к url (зарезервированная переменная)
	*
	* 	@property {boolean} valid - Валидация (зарезервированная переменная)
	*	@property {boolean} loading - Статус загрузки данных (зарезервированная переменная)
	*	@property {boolean} searchlineShow - Стутс отображения поиска (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {boolean} addNew - Статус видимости попап окна новой публикации
	*	@property {boolean} dialogRemoveItem - Статус отображения диалогового окна при попытке уаления публикации из списка
	*	@property {boolean} sound - Статус звуковых оповещений
	*	@property {boolean} quickView - Статус отображения виджета быстрого просмотра
	*	@property {boolean} statisticWindow - Статус отображения статистики
	*	@property {boolean} sendNewName - Статус связи с сервером при создании новой категории (зарезервированная переменная)
	*
	* 	@property {array} nameRules - Правила валидации поля name ([подробнее]{@link https://vuetifyjs.com/en/components/forms})
	*
	*	@property {object} pagination - Параметры пагинации таблицы (резерв, [подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} headers - Параметры таблицы ([подробнее]{@link https://vuetifyjs.com/en/components/data-tables})
	*	@property {array} selected - Выделенные элементы таблицы
	*	@property {array} posts - Список публикаций (Зарезервированная переменная)
	*
	*	@property {string} search - Значения поиска (Зарезервированная переменная)
	*	@property {string} notify - Текст оповещения (Зарезервированная переменная)
	*	@property {string} newName - Название новой публикации (Зарезервированная переменная)
	*	@property {string} img - (Зарезервированная переменная)
	*
	*	@property {object} selectItem - Данные выбранной публикации (зарезервированная переменная)
	*		@property {object} selectItem.id - ID публикации (зарезервированная переменная)
	*
	*	@property {object} statistics - Статистика по публикация блога
	*		@property {int} statistics.full - Всего публикаций (Зарезервированная переменная)
	*		@property {int} statistics.clear - Пустых публикаций (Зарезервированная переменная)
	*		@property {int} statistics.on - Активных публикаций (Зарезервированная переменная)
	*		@property {int} statistics.off - Неактивных публикаций (Зарезервированная переменная)
	*
	*/
	postsListUrl: '/blog/posts/',
	postRemoveUrl: '/blog/posts/remove/',
	postStatusToggle: '/blog/posts/status/',
	postAddNewURL: '/blog/category/new',
	statutsUrlPostprefix: '',
	valid: true,
	loading: true,
	searchlineShow: false,
	addNew: false,
	dialogRemoveItem: false,
	sound: true,
    quickView: false,
	statisticWindow: false,
	sendNewName: false,
	nameRules: [
		v => !!v || 'Назваение обязательно к заполнению',
		v => (v && v.length > 4) || 'Имя должно быть более 4-х символов. Введено - ' + v.length
	],
	pagination: {sortBy: 'id'},
	headers: [
		{ text: 'ID', value: 'id' },
		{
			text: 'Название',
			align: 'left',
			value: 'name'
		},
		{ text: 'Кол-во пуб.', align: 'center', value: 'posts_count' },
		{ text: 'Статус', value: 'status', align: 'left' },
		{ text: '', value: '', sortable: false }
	],
	selected: [],
	posts: [],
	search: '',
	notify: '',
	newName: '',
    selectItem: {id: 0},
	statistics: {
		full: 0,
		clear: 0,
		on: 0,
		off: 0
	},
	img: ''
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос списка публикаций блога (AJAX)
	*	@method getPosts
	**/
	getPosts (){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		return this.axios({
            method: 'get',
            url: this.postsListUrl,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            // console.log(response.data)                
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Blog categories\' (@/pages/blog/articles) - AJAX error');

            	this.notify = 'Произошла ошибка при загрузке данных...'
                this.$store.commit('error', this.notify);
            }
            else {
				this.$log.debug('page \'Blog categories\' (@/pages/blog/articles) - AJAX success');

                this.posts = response.data.posts;
                this.getStatistics();
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сбор статистики публикаций блога
	*	@method getStatistics
	**/
	getStatistics(){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		const t = this;
		this.posts.forEach(function(item, i, arr) {
			if(parseInt(item.status) == 1) {
				t.statistics.on += 1;
			} else {
				t.statistics.off += 1;
			}

			if(parseInt(item.posts_count) > 0) {
				t.statistics.full += 1;
			} else {
				t.statistics.clear += 1;
			}
		});

		this.statisticWindow = true;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение статуса видимости поиска по таблице
	*	@method toggleSearch
	**/
	toggleSearch (){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		if(this.searchlineShow){
			this.search = '';
		}

		this.searchlineShow = !this.searchlineShow;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сортировка таблицы
	*	@method changeSort
	**/
	changeSort (column) {
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		if (this.pagination.sortBy === column) {
			this.pagination.descending = !this.pagination.descending
		} else {
			this.pagination.sortBy = column
			this.pagination.descending = false
		}
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Всплывающее окно при попытке удаления публикации
	*	@method removeAlert
	**/
	removeAlert (){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');
		
		if(this.sound) {
			const audio = new Audio();
			audio.preload = 'auto';
			audio.src = '/sound/system/Sound_11990.wav';
			audio.play();
		}

		this.dialogRemoveItem = true;
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Выбор публикации
	*	@param item {object} - Данные выбранной публикации
	*	@method setSelectItem
	**/
	setSelectItem (item){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		this.selectItem = item;
		this.img = this.$root.domain + this.selectItem.img;
		if(this.selectItem.status == '0' || this.selectItem.status == 0) this.selectItem.status = false
		else this.selectItem.status = true
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос на удаление публикации (AJAX)
	*	@method removeArticle
	**/
	removeArticle (){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		this.dialogRemoveItem = false;

		return this.axios({
            method: 'post',
            url: this.postRemoveUrl + this.selectItem.id,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: this.$root.querystring.stringify({seo: this.selectItem.seo}),
        }).then((response) => {
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Blog categories\' (@/pages/blog/articles) - AJAX error');

            	this.notify = { error: 'Произошла ошибка при загрузке данных...'}
                this.$store.commit('error', this.notify);
            }
            else {
				this.$log.debug('page \'Blog categories\' (@/pages/blog/articles) - AJAX success');

                const elem = document.getElementById('CatBlog_' + this.selectItem.id);
                elem.parentNode.removeChild(elem);
                this.$store.commit('success', 'Категория успешно удалена.');
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрос обновления данных публикации (AJAX)
	*	@method updateStatusArticle
	**/
	updateStatusArticle (){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		if(this.selectItem.status){
			this.statutsUrlPostprefix = 0;
        	this.notify = 'Категория не отображается на сайте =('
		}else {
			this.statutsUrlPostprefix = 1;
        	this.notify = 'Все ок! Категория отображается на сайте =)'
		}

		return this.axios({
            method: 'get',
            url: this.postStatusToggle + this.statutsUrlPostprefix + '/' + this.selectItem.id,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            if(response.data.status == "ERROR") {
				this.$log.error('page \'Blog categories\' (@/pages/blog/articles) - AJAX error');

                this.$store.commit('error', response.data);
            }
            else {
				this.$log.debug('page \'Blog categories\' (@/pages/blog/articles) - AJAX success');

                this.$store.commit('success', this.notify);
                this.selectItem.status = !this.selectItem.status;
                if(!this.selectItem.status) {
                    this.statistics.on -= 1;
					this.statistics.off += 1;
                } else{
                    this.statistics.on += 1;
					this.statistics.off -= 1;
                }
            }
        });
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Закрытие окна добавления новой публикации
	*	@method addNewReset
	**/
	addNewReset (e){
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		e.preventDefault();
		this.addNew = false;
		this.newName = '';
	},

	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Добавление новой публикации (AJAX)
	*	@method submitAddNew
	**/
	submitAddNew() {
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - method init');

		if(this.$refs.form.validate()){
			this.sendNewName = true;
			const url = this.$root.translite(this.newName)
			const data = {
				name: this.newName,
				url: url
			}

			return this.axios({
                method: 'post',
                url: this.postAddNewURL,
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                responseType: 'json',
                data: this.$root.querystring.stringify(data),
            }).then((response) => {
                this.sendNewName = false;
                if(response.data.status == "ERROR") {
					this.$log.error('page \'Blog categories\' (@/pages/blog/articles) - AJAX error');

                    this.$store.commit('error', response.data);
                } else {
					this.$log.debug('page \'Blog categories\' (@/pages/blog/articles) - AJAX success');

                    this.$store.commit('success', 'Новая категория добавлена успешно!');
                    this.$router.push({name: 'blogCategory', params: {id: response.data.id}});
 				}
            });
		}
	}
}

/** Export component */
export default {
	
	// Set data
	data: function(){ return data },

	// Methods
	methods:methods,
	
	/**
	* @desc ▶ Hook reporting
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Запрашиваем список публикаций при загрузке компонента -> getPosts()
	* @event module:pages/blog/articles~Page <strong>Blog articles</strong> mounted
	*/
	mounted: function () {
		this.$log.info('page \'Blog articles\' (@/pages/blog/articles) - mounted hook init');
		
		// Запрашиваем список категорий при загрузке компонента
		const list = this.getPosts.bind(this);
		list();
	},
}