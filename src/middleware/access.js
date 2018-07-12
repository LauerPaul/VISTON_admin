import store from '@/store'
import router from '@/router'

router.beforeEach(
    (to, from, next) => {
        // Проверяем параметры языка
        store.dispatch('Site/LANGUAGE_CONTROL', to, {root:true});
        // Перенаправляем на главную, если указан язык по умолчанию в url
        if(to.params.lang == store.state.Site.default_language){ next({ name: to.name }) }

        // Access
        if(to.matched.some(record => record.meta.isAuth)){
            if(!store.state.Auth.auth){
                next({ name: 'login', params: { lang: store.state.Site.current_language } })
            } else{
               if(to.name !== 'home' && to.name !== 'logout'){
                    let name = to.name;
                    let item = store.state.Auth.accessTable[name]
                    let access = item == undefined ? false : item.access
                    if(access) access = parseInt(access)

                    if(access) next()
                    else {
                        if(from.name !== null) next({ name: from.name })
                        else{
                            next({ name: 'home', params: { lang: store.state.Site.current_language } })
                        }

                        store.dispatch('notify', {
                            type: 'error',
                            text: 'Недостаточно прав для доступа!'
                        })
                    }
                }
                else next()
            }
        } else {
            if(store.state.Auth.auth && to.path === '/login'){
                next({ name: 'home', params: { lang: store.state.Site.current_language } })
            }
            next()
        }
    }
);