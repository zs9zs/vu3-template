import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import stores from "@/stores/index";
import ElementPlus from "element-plus";
import zhLocale from "element-plus/es/locale/lang/zh-cn";
import persist from "pinia-plugin-persistedstate";
import Particles from "particles.vue3";

import "element-plus/dist/index.css";
// 共用样式
import "@/assets/style/index.scss";
// 路由
import router from "@/router/index";

createApp(App)
  .use(router)
  .use(createPinia().use(persist))
  .use(stores)
  .use(ElementPlus, { locale: zhLocale })
  .use(Particles)
  .mount("#app");
