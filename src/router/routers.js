import {createRouter, createWebHashHistory} from "vue-router";
import Layout from '@/layout/index.vue'
import Home from '@/views/Home.vue'

export const routerMap = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/Login.vue')
    },
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/error/401.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue')
    },
    {
        path: '/Layout',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'HomePage',
                component: Home
            }
        ]
    }
]

const routers = createRouter({
    history: createWebHashHistory(),
    routes: routerMap
})

export default routers