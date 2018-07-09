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
			/**
			* @typedef {Object} Data
			*   @property {boolean} locationClass - Класс с именем роута
			*/
			locationClass: this.$route.name,
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

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> created
	*/
	created () {
		this.$log.info('Layout \'Default\' (@/layouts/default) - created hook init');
     
        this.$Progress.start()
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> mounted
	*/
	mounted: function(){
		this.$log.info('Layout \'Default\' (@/layouts/default) - mounted hook init');
        
        this.$Progress.finish()
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> beforeUpdate
	*/
	beforeUpdate() {
		this.$log.info('Layout \'Default\' (@/layouts/default) - beforeUpdate hook init');
        
        this.$Progress.start()
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:layouts/default~Layout <strong>Default</strong> updated
	*/
	updated(){
		this.$log.info('Layout \'Default\' (@/layouts/default) - updated hook init');
        
        this.$Progress.finish()
	},

	/**
	* This layout watch:
	* 	> $route
	* 	> $store.state.Auth.auth
	*/
	watch: {
    	'$route' (to, from) {
    		this.locationClass = this.$route.name;
      	},
      	'$store.state.Auth.auth': function (v) {
      		if(this.$store.state.Auth.auth) this.$router.push({name: 'home'});
      		else this.$router.push({name: 'login'});
      		this.auth = this.$store.state.Auth.auth
      	},
    }
}

