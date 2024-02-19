import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

// // 引入createApp函数,创建对应的应用,产生应用的实例对象
// import { createApp } from 'vue'

// import { createPinia } from 'pinia'
// import store from './store'

// import "@/styles/normalize.css"

// // 引入app组件(所有组件的父级组件)
// import App from './App.vue'

// import router from './router'

// // 创建app应用返回对应的实例对象,调用mount方法进行挂载  挂载到#app节点上去
// const app = createApp(App)

// app.use(createPinia())
// // 挂载pinia
// app.use(store)

// // 挂载路由
// app.use(router)

// // 挂载实例
// app.mount('#app')
