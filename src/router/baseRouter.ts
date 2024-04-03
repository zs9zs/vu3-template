export default [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/LoginPage.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/views/layout/LayoutContainer.vue"),
    children: [
      {
        path: "/article/channel",
        name: "articleChannel",
        component: () => import("@/views/article/ArticleChannel.vue"),
      },
      {
        path: "/article/manage",
        name: "articleManage",
        component: () => import("@/views/article/ArticleManage.vue"),
      },
    ],
  },
];
