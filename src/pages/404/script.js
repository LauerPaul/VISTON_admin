/**
* @vuedoc
* @module pages/404
* @see @/pages/404
*
* @version 1.0
* @desc Страница 404
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

	// Head
	metaInfo: {
		title: 'Админ панель - 404'
	},

	/**
	* @desc ▶ Hook reporting <br>
	* <strong style="color:red; font-size: 18px;">ⓘ</strong>
	*
	* @event module:pages/404~Page <strong>not found (404)</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Not Found (404)\' (@/pages/404) - mounted hook init');
	},
}