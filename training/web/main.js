// main.ts

import { createApp, render } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './assets/global.css'
// 引入axios，进行异步
import axios from 'axios'
// import router from './router'
// import store from './store'
//设置全局axios地址
axios.defaults.baseURL = 'http://localhost:8091/'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
// 绑定$http事件
app.config.globalProperties.$http = axios

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, { size: 'small' })
// app.use(store)
// app.use(router)

app.mount('#app')
