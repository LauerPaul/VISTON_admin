/**
* @vuedoc
* @module pages/blog/menu
* @see @/pages/blog/menu
*
* @version 1.0
* @desc Страница меню настроек блога
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
	// Set data
	data: function(){ return data },

	// Method
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/blog/menu~Page <strong>Blog menu</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Blog menu\' (@/pages/blog/menu) - mounted hook init');
	},
}