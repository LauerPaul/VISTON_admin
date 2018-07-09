/**
* @vuedoc
* @module pages/settings
* @see @/pages/settings
*
* @version 1.0
* @desc Страница настроек сайта
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

	// Method
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/settings~Page <strong>Settings</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Settings\' (@/pages/settings) - mounted hook init');
	},
}