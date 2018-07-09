import store from '@/store'
import router from '@/router'
/**
* @vuedoc
* @module plugins/logger
* @see @/plugins/logger
*
* @version 1.0
* @desc Плагин logger
*	> Используется для записи событий в лог БД
*	> Обращается к [store site]{@link module:store/site}
*
*	Для вызова: this.$logger(action, val, oldVal)
*	> action - событие
*	> val - значение
*	> oldVal - старое значение
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
export default {
	install(Vue, options) {
		Vue.prototype.$logger = function (action, val, oldVal) {
			if(store.state.Auth.auth && store.state.Site.logAdmin_write && val){
				var old_val = oldVal == undefined ? '' : oldVal
				var id = store.state.Auth.user.id
				var date = Date.now()
				var path = router.history.current.fullPath
				var data = {
							date: date,
							url: path,
							event: action,
							user_id: id,
							val: val,
							old_val: old_val
						}
				store.commit('logWrite', data);				
			}else {
				return false
			}
		}
	}
}