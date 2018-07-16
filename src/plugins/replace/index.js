/**
* @vuedoc
* @module plugins/replace
* @see @/plugins/replace
*
* @version 1.0
* @desc Плагин replace - используется для звукового оповищения
*
*	Для вызова: 
*		> this.$replace()
*
* @param string {string|func} - строка
* @param to {string} - на что нужно заменить
* @param replace {string} - что нужно заменить (по умолчанию %)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
export default {
	install(Vue, options) {
		Vue.prototype.$replace = (string, to, replace = '%')=>{
			var str = string
			return str.replace(replace, to)
		}
	}
}