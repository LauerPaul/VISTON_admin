/**
* @vuedoc
* @module plugins/random
* @see @/plugins/random
*
* @version 1.0
* @desc Плагин random
* возвращает рандомное число с префиксом
* > принимает в аргументе prefix {string}
* > возвращает строку
* > вызов this.$random(prefix)
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
export default {
	install(Vue, prefix) {
		Vue.prototype.$random = function (prefix) {
			var prefix_ = prefix == undefined ? '?' : prefix
			var rand = 1234567890 + Math.random() * (9999999999 + 1 - 1234567890);
			rand = Math.floor(rand);
			return prefix_ + rand;
		}
	}
}