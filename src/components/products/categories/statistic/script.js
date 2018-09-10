/**
* @vuedoc
* @module components/blog/categories/statistic
* @see @/components/blog/categories/statistic
*
* @version 1.0
* @desc Компонент статистики категорий блога
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
const data = {
	/**
	* @typedef {Object} Data
	*	@property {boolean} loading - Статус загрузки данных
	*	@property {object} statistics - Статистика по категориям блога
	*		@property {int} statistics.full - Всего категорий (Зарезервированная переменная)
	*		@property {int} statistics.clear - Пустых категорий (Зарезервированная переменная)
	*		@property {int} statistics.on - Активных категорий (Зарезервированная переменная)
	*		@property {int} statistics.off - Неактивных категорий (Зарезервированная переменная)
	*
	*	@property {object} text - Текст
	*		@property {object} text.full - Со статьями
	*		@property {object} text.clear - Без статей
	*		@property {object} text.on - Активных
	*		@property {object} text.off - Не активных
	*/
	loading: false,
	statistics: {
		full: 0,
		link: 0,
		clear: 0,
		on: 0,
		off: 0
	},
	text: {
		full: 'Со статьями',
		link: 'Ссылок',
		clear: 'Пустых',
		on: 'Активных',
		off: 'Не активных'
	}
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Сбор статистики категорий блога
	*	@method getStatistics
	**/
	getStatistics(){
		this.$log.info('page \'Blog categories statistic\' (@/components/blog/categories/statistic) - method init');
		
		var list = this.categories ? this.categories : (this.articles ? this.articles : new Array());

		this.loading = true
		this.statistics.on = 0
		this.statistics.off = 0
		this.statistics.full = 0
		this.statistics.clear = 0
		this.statistics.link = 0
		
		if(this.articles){
			this.statistics.full = false
			this.statistics.clear = false
		}

		list.forEach((item, i, arr) => {
			if(parseInt(item.status) == 1 || item.status == true) this.statistics.on += 1;
			else this.statistics.off += 1;

			if(this.categories){
				if(parseInt(item.subcats_count) > 0 && !parseInt(item.publication))
					this.statistics.full += 1;
				else if(parseInt(item.subcats_count) > 0 && parseInt(item.publication))
					this.statistics.link += 1;
				else if(!this.articles) this.statistics.clear += 1;
			}
			else if(this.articles){
				if(parseInt(item.parent_id) == 0) this.statistics.link += 1;
			}
			
		});
		this.loading = false
	},
}

// Export component
export default {
	// Data
	data: () => (data),

	/**
	* @typedef {Object} Props
	* 	@property {string} categories - массив категорий
	* 	@property {string} articles - массив публикаций
	*/
	props: [
		'categories',
		'articles'
	],

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/blog/categories/statistic~Component <strong>Products statistic</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Blog categories statistic\' (@/components/blog/categories/statistic) - mounted hook init');
	},

	watch: {
		categories: {
			handler(val){
				return this.getStatistics()
			},
			deep: true
		},
		articles: {
			handler(val){
				return this.getStatistics()
			},
			deep: true
		},
	}

}