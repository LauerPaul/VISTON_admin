/**
* @vuedoc
* @module components/common/header
* @see @/components/common/header
*
* @version 1.0
* @desc Боковое меню навигации
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	*/
}

const methods = {
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Переключение режима [Aside menu]{@link module:components/common/aside} (минимизация меню)
	*	@method toggleAside
	**/
	toggleAside() {
		this.$store.commit('asideToggle')
	}
}


export default {

	// Set data
	data: function() { return data },
	
	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/common/header~Component <strong>Header</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Header\' (@/components/common/header) - mounted hook init');
	},
}