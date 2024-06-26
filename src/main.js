import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import {createPinia} from "pinia";
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from "@/router/routers";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './assets/css/public.css'
import './assets/iconfont/iconfont.css'

import './utils/message'
import './router/index'
import './utils/common'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.mount('#app')


