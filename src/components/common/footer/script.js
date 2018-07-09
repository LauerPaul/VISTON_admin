/**
* @vuedoc
* @exports components/common/footer
* @see @/components/common/footer
*
* @version 1.0
* @desc Футер
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


export default {
	// Set data
	data: function() { return data },

	// Methods
	methods: methods,

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/common/footer~Component <strong>Footer</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Footer\' (@/components/common/footer) - mounted hook init');
	},
}