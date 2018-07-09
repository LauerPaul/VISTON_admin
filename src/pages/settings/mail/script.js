/**
* @vuedoc
* @module pages/settings/mail
* @see @/pages/settings/mail
*
* @version 1.0
* @desc Страница настроек почты
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
	* @event module:pages/settings/mail~Page <strong>Settings mail</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Settings mail\' (@/pages/settings/mail) - mounted hook init');
	},
}