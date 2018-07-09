/**
* @vuedoc
* @module store/access
* @see @/store/access
*
* @version 1.0
* @desc Хранилище данных - доступы
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/
import Vue from 'vue'
import store from '@/store'
import router from '@/router'

const Access = {
    /**
    * @typedef {Object} State
    *   @property {boolean} access - Зарезервированная переменная
    *   @property {boolean} action - Зарезервированная переменная 
    */
    state: {
    	access: false,
        action: true
    },
    mutations: {
        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Проверка прав доступа по роуту
        *   > 1 - Admin
        *   > 2 - Moderator
        *   > 3 - Manager
        *   > 4 - Seo
        *   @method getAccess
        **/
        getAccess: (state, data) => {
            Vue.$log.debug('component \'Store access\' (@/store/access) - commit init');

            data.forEach((status) => {
                if(status == 1 && store.state.Auth.isAdmin) state.access = true
                if(status == 2 && store.state.Auth.isModerator) state.access = true
                if(status == 3 && store.state.Auth.isManager) state.access = true
                if(status == 4 && store.state.Auth.isSeoDev) state.access = true
            });

            if(!state.access) {
                router.push({name: 'home'});
                store.commit('error', {error: 'Недостаточно прав'});
            } else {
                state.access = false;
            }
        },

        /**
        *   @desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Проверка прав доступа по методу
        *   > 1 - Admin
        *   > 2 - Moderator
        *   > 3 - Manager
        *   > 4 - Seo
        *   @method getAccessAction
        **/
        getAccessAction: (state, data) => {
            Vue.$log.debug('component \'Store access\' (@/store/access) - commit init');

        	data.forEach((status) => {
        		if(status == 1 && store.state.Auth.isAdmin) state.access = true
        		if(status == 2 && store.state.Auth.isModerator) state.access = true
        		if(status == 3 && store.state.Auth.isManager) state.access = true
        		if(status == 4 && store.state.Auth.isSeoDev) state.access = true
        	});

        	if(!state.access) {
                store.commit('error', {error: 'Недостаточно прав'});
                state.action = false;
            } else {
                state.action = true;
        		state.access = false;
        	}
        },
    }
}

export default Access