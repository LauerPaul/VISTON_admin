/**
* @vuedoc
* @module pages/products
* @see @/pages/products
*
* @version 1.0
* @desc Страница продукции
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
	* @event module:pages/blog~Page <strong>Products</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Products\' (@/pages/products) - mounted hook init');
	},
}