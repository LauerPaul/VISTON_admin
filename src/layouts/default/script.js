/**
* @vuedoc
* @module layouts/default
* @see @/layouts/default
*
* @version 1.0
* @desc Основной шаблон
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import headerLine from '@/components/common/header'
import aside_menu from '@/components/common/aside'

export default {
	data() {
		return {
			auth: this.$store.state.Auth.auth
		}
	},

	/**
	*	This layout use components:
	*		> [Header]{@link module:components/common/header}
	*		> [Aside menu]{@link module:components/common/aside}
	*/
	components: {
		headerLine,
		aside_menu,
	},

	beforeCreate: function(){
		this.$log.info('Layout \'Default\' (@/layouts/default) - beforeCreate hook init');
	},
	
	watch: {
      	'$store.state.Auth.auth': function (v) {
      		this.auth = this.$store.state.Auth.auth
      	},
    }
}

