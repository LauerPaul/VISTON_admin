/**
* @vuedoc
* @module components/common/aside
* @see @/components/common/aside
*
* @version 1.0
* @desc Боковое меню навигации
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import { mapState } from 'vuex'
import Scrollbar from 'perfect-scrollbar'
import menu from "./listMenu.js"

const data = {
	/**
	* @typedef {Object} Data
	*
	* 	@property {object} scroll - Параметры для плагина стилизации скролла
	*		@property {boolean} scroll.scrollStatus - <strong>Вкл/Выкл</strong> инициализации скролла
	* 		@property {string} scroll.scrollWrapperId - <strong>ID</strong> на котором будет инициализирован скролл
	* 		@property {string} scroll.scrollWrapper - Переменная для хранения объекта - контейнер скролла  (резерв - не заполнять)
	* 		@property {string} scroll.scroll - Переменная для храниения инициализированного скролла (резерв - не заполнять)
	* 		@property {string} scroll.scrollOptions - Опци для работы скролла ([Документация]{@link https://github.com/utatti/perfect-scrollbar})
	*
	* 	@property {boolean} drawer - Зарезервированная переменная ([подробнее]{@link https://vuetifyjs.com/en/components/navigation-drawers#introduction})
	* 	@property {boolean} status - Статус пользователя (зарезервированная переменная)
	* 	@property {boolean} isAdmin - Статус админа (зарезервированная переменная)
	* 	@property {boolean} isSeoDev - Статус SEO-специалиста (зарезервированная переменная)
	* 	@property {boolean} isModerator - Статус модератора (зарезервированная переменная)
	* 	@property {boolean} isManager - Статус менеджера (зарезервированная переменная)
	*
	* 	@property {array} items - Список элементов меню (зарезервированная переменная)
	* 		@property {string} items.object.title - Заголовок элемента
	* 		@property {string} items.object.icon - Класс иконки элемента
	* 		@property {string} items.object.color - Цвет иконки ([подробнее]{@link https://vuetifyjs.com/en/style/colors})
	* 		@property {string} items.object.link - Route name - ссылка на страницу
	* 		@property {boolean} items.object.parent - Элемента является родительским
	* 		@property {array} items.object.children - Дочерние элементы
	*	 		@property {string} items.object.children.title - Заголовок элемента
	*	 		@property {string} items.object.children.icon - Класс иконки элемента
	*	 		@property {string} items.object.children.color - Цвет иконки ([подробнее]{@link https://vuetifyjs.com/en/style/colors})
	*	 		@property {string} items.object.children.link -Route name - ссылка на страницу
	*/
	scroll: {
		scrollStatus: true,
		scrollWrapperId: 'first-container-scroll-wrapper',
		scrollWrapper: '',
		scroll: '',
		scrollOptions: {
			wheelPropagation: true,
			suppressScrollX: true
		}
    },
	drawer: true,
	status: '',
	isAdmin: false,
	isSeoDev: false,
	isModerator: false,
	isManager: false,
	items: [],
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Инициализация плагина стилизации сролла
	*	@method scrollInit
	**/
	scrollInit(){
		// Log method init
		this.$log.debug('component \'Aside menu\' (@/components/common/aside) - Scroll plugin init');

		if(this.scroll.scrollStatus && this.scroll.scrollWrapperId && this.scroll.scrollWrapperId !== ''){
	        this.scroll.scrollWrapper = document.getElementById(this.scroll.scrollWrapperId);
	        this.scroll.scroll = new Scrollbar('#' + this.scroll.scrollWrapperId , this.scroll.scrollOptions);
      	} else{ this.$log.warn('component \'Aside menu\' (@/components/common/aside) - Scroll plugin is off in settings')}
	},

	/**
	* @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Обновление плагина стилизации скролла - используется в случае обвноления высоты окна модуля.
	* @method scrollUpdate
	*/
	scrollUpdate(){
		setTimeout(()=>{
			this.$log.debug('component \'Aside menu\' (@/components/common/aside) -> update scroll plugin');
			this.scroll.scroll.update();
		}, 1000);
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Назначение статуса пользователя /установка переменной items[]
	*	@method setStatus
	**/
	setStatus() {
		this.$log.debug('component \'Aside menu\' (@/components/common/aside) - method init');

		// ADMIN
		if(this.$store.state.Auth.isAdmin){
			this.status = 'Admin'
			this.isAdmin = true
			this.items = menu.admin
		}
		// Seo developer
		else if(this.$store.state.Auth.isSeoDev){
			this.status = 'SEO специалист'
			this.isSeoDev = true
			this.items = menu.seo
		}
		// Moderator
		else if(this.$store.state.Auth.isModerator){
			this.status = 'Moderator'
			this.isModerator = true
			this.items = menu.moderator
		}
		// Manager
		else if(this.$store.state.Auth.isManager){
			this.status = 'Manager'
			this.isManager = true
			this.items = menu.manager
		}
	}
}


export default {

	// Set data
	data () { return data },

	/**
	*  @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> This component computed:
	*  variable **aside_min** - from [Store Site]{@link module:store/site}
	**/
	computed: {
		...mapState('Site', ['aside_min'])
	},

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода SetStatus()
	* <strong style="color:red; font-size: 18px;">ⓘ</strong> Вызов метода scrollInit()
	*
	* @event module:components/common/aside~Component <strong>Aside menu</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Aside menu\' (@/components/common/aside) - mounted hook init');
		this.setStatus();
		this.scrollInit();
	},
}