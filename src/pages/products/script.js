/**
* @vuedoc
* @module pages/blog
* @see @/pages/blog
*
* @version 1.0
* @desc Страница настроек блога
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
	* @event module:pages/blog~Page <strong>Blog</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'blog\' (@/pages/blog) - mounted hook init');
	},
}