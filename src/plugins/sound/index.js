/**
* @vuedoc
* @module plugins/sound
* @see @/plugins/sound
*
* @version 1.0
* @desc Плагин sound - используется для звукового оповищения
*
*	Для вызова: 
*		> this.$sound.error()
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
export default {
	install(Vue, options) {
		Vue.prototype.$sound = {
			error: function(){
				const audio = new Audio();
				audio.preload = 'auto';
				audio.src = '/sound/system/Sound_11990.wav';
				audio.play();
			}
		} 
	}
}