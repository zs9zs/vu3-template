import { createRouter, createWebHashHistory } from "vue-router";
import baseRouters from "./baseRouter.js";

const routes = [...baseRouters];

const _createRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
      // scrollBehavior(to, from, savedPosition)
      // 这个功能只在支持 history.pushState 的浏览器中可用
      // return 期望滚动到哪个的位置
      return {
        el: "#app",
        top: 0,
        behavior: "smooth",
      };
    },
  });

const router = _createRouter();

export function resetRouter() {
  const newRouter = _createRouter();
  router.matcher = newRouter.mathcer;
}

export default router;
