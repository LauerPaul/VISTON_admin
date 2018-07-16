/**
* @vuedoc
* @module components/common/langs_switcher
* @see @/components/common/langs_switcher
*
* @version 1.0
* @desc Боковое меню навигации
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

import { mapState } from 'vuex'

const data = {
}

const methods = {
}


export default {

	// Set data
	data: function() { return data },
	
	// Methods
	methods: methods,

	/**
	*  @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> This component computed:
	*  variable **langs** - from [Store Site]{@link module:store/site}
	*  variable **curLng** - from [Store Site]{@link module:store/site}
	**/
	computed: {
		...mapState('Site', ['langs', 'curLng'])
	},

	/**
	* @desc ▶ Hook reporting <br>
	* @event module:components/common/langs_switcher~Component <strong>Langs</strong> mounted
	*/
	mounted: function (){
		this.$log.info('component \'Langs\' (@/components/common/langs_switcher) - mounted hook init');
	},
}