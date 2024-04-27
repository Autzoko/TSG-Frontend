import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImageCaptioning from "@/views/ImageCaptioning.vue";
import LoginView from "@/views/LoginView.vue";
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/caption',
    name: 'ImageCaptioning',
    component: ImageCaptioning,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: 'LoginView',
    component: LoginView,
    meta: { requiresAuth: false },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.auth.loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
