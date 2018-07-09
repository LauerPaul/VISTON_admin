/**
* @vuedoc
* @module store
* @see @/store
*
* @version 1.0
* @desc Хранилище данных
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createMutationsSharer from 'vuex-shared-mutations'

import Site from '@/store/site'
import Auth from '@/store/auth'
import Access from '@/store/access'
import Notify from '@/store/notify'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [ 
    	createPersistedState({ storage: window.sessionStorage }),
    	createMutationsSharer({ predicate: (mutation, state) => {
	   		const predicate = [
	   		]
		    return predicate.indexOf(mutation.type) >= 0;
		}})
    ],
    modules: {
    	/**
    	* Store incudes:
    	* - [Store site]{@link module:store/site}
    	* - [Store auth]{@link module:store/auth}
    	* - [Store access]{@link module:store/access}
    	* - [Store notify]{@link module:store/notify}
    	*/
    	Site: Site,
        Auth: Auth,
        Access: Access,
        Notify: Notify
    },
})

export default store