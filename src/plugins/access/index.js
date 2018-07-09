import store from '@/store'
import router from '@/router'
/**
* @vuedoc
* @module plugins/access
* @see @/plugins/access
*
* @version 1.0
* @desc Плагин access
*	> Используется для проверки доступа к действиям
*
*	Для вызова: this.$access(action, info)
*	> action {string} - событие ['edit', 'add', 'remove']
*	> info {boolean} - отключить оповищение
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
export default {
	install(Vue, options) {
		Vue.prototype.$access = function (action, sound) {
			if(action){
				var name = router.history.current.name
				var access = store.state.Auth.accessTable[name][action]
				if(parseInt(access) == 1 || access == true)	return true	
				else {
					if(!sound){
						const audio = new Audio();
						audio.preload = 'auto';
						audio.src = '/sound/system/Sound_11990.wav';
						audio.play();

						store.dispatch('notify', {
			    			type: 'error',
			    			text: 'Недостаточно прав!',
			    		})
					}
		    		return false
				}
			}else {
				return 'Укажите action'
			}
		}
	}
}