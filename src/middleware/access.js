import store from '@/store'
import router from '@/router'

router.beforeEach(
    (to, from, next) => {
        if(to.matched.some(record => record.meta.isAuth)){
            if(!store.state.Auth.auth){
                next({
                    path: '/login'
                })
            } else{
               if(to.path !== '/' && to.path !== '/logout'){
                    let name = to.name;
                    let item = store.state.Auth.accessTable[name]
                    let access = item == undefined ? false : item.access
                    if(access) access = parseInt(access)

                    if(access) next()
                    else {
                        if(from.name !== null) next({ name: from.name })
                        else{
                            next({ path: '/' })
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
            console.log(to.name);
            if(store.state.Auth.auth && to.path === '/login'){
                next({ path: '/' })
            }
            next()
        }
    }
);