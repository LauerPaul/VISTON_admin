/**
* @vuedoc
* @module plugins/dictionary
* @see @/plugins/dictionary
*
* @version 1.0
* @desc Плагин dictionary
* возвращает [store.state.Site.dictionary[слово]]{@link module:store/site}
* > вызов this.$word(key)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import store from "@/store"

export default {
	install(Vue) {
		Vue.prototype.$word = function(key){
			if(key){
				return store.state.Site.dictionary[key]
			}
		}
	}
}
