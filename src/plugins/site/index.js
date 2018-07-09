/**
* @vuedoc
* @module plugins/site
* @see @/plugins/site
*
* @version 1.0
* @desc Плагин site
* возвращает [store.state.Site]{@link module:store/site}
* > вызов this.$site
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import store from "@/store"

const init = function(Vue){
	var site = store.state.Site
	return site
}

export default {
	install(Vue) {
		Vue.prototype.$site = init(Vue)
	}
}
