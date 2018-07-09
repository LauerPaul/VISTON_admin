/**
* @vuedoc
* @module plugins/auth
* @see @/plugins/auth
*
* @version 1.0
* @desc Плагин auth
* возвращает [store.state.Auth]{@link module:store/auth}
* > вызов this.$user
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import store from "@/store"

export default {
	install(Vue) {
		Vue.prototype.$user = function(){
			if (!store.state.Auth.auth) return false
			return store.state.Auth.user
		}
	}
}
