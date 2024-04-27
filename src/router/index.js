import router from '@/router/routers';
import {useStore} from "@/store";
import {queryAllMenu} from "@/api/menu/sysMenu";
import {errorMsg} from "@/utils/message";

const whiteList = ['/login', '/401', '/404']

router.beforeEach((to, from, next) => {
  console.log('router request: ' + to.path)
  const store = useStore()
  // if logged in
  if(store.token) {
    if(to.path === '/') {
      router.go(-1)
    }
    if(to.path === '/login') {
      next({path: '/Layout'})
    } else {
      if(!store.isLoadMenu) {
        loadMenus(next, to)
      } else {
        if(!hashRoute(to)) {
          addRoute()
          if(hashRoute(to)) {
            next(to.fullPath)
          } else {
            next({path: '/404'})
          }
        } else {
          next()
        }
      }
    }
  } else {
    if(whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/login'})
    }
  }
})

export function loadMenus(next, to) {
  const store = useStore()
  queryAllMenu().then(res => {
    if(res.success) {
      if(res.data.length > 0) {
        store.routerAction(res.data)
        store.loadMenuAction(true)
        next({...to, replace: true})
      }
    } else {
      errorMsg(res.msg)
    }
  })
}

export function hashRoute(to) {
  let find = router.getRoutes().find(item => item.path === to.path)
  return !!find
}

export function addRoute() {
  const store = useStore()
  let routers = store.routers
  if(routers && routers.length > 0) {
    console.info(routers)
    routers.forEach(item => {
      if(item.path) {
        router.addRoute('Layout', {
          path: item.path,
          name: item.name,
          component: item.component != null ? () => import(`@/views/${item.component()}`) : null
        })
      }
    })
  }
}