/**
* @vuedoc
* @module pages/settings/primary
* @see @/pages/settings/primary
*
* @version 1.0
* @desc Страница основных настроек сайта
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
	* @event module:pages/settings/primary~Page <strong>Settings primary</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Settings primary\' (@/pages/settings/primary) - mounted hook init');
	},
}