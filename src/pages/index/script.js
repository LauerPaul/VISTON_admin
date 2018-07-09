/**
* @vuedoc
* @module pages/home
* @see @/pages/index
*
* @version 1.0
* @desc Главная страница
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	*
	*/
}

const methods = {
}


/** Export component */
export default {
	// Data
	data: function(){ return data },

	// Head
	metaInfo: {
		title: 'Админ панель - Главная'
	},

	// Method
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/home~Page <strong>Home</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Home\' (@/pages/home) - mounted hook init');
	},
}