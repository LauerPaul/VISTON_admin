/**
* @vuedoc
* @module pages/services
* @see @/pages/services
*
* @version 1.0
* @desc Страница услуг
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
	* @event module:pages/services~Page <strong>Services</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Services\' (@/pages/services) - mounted hook init');
	},
}