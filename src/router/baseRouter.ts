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
      {
        path: "/user/profile",
        name: "profile",
        component: () => import("@/views/user/UserProfile.vue"),
      },
      {
        path: "/user/avatar",
        name: "avatar",
        component: () => import("@/views/user/UserAvatar.vue"),
      },
      {
        path: "/user/password",
        name: "password",
        component: () => import("@/views/user/UserPassword.vue"),
      },
    ],
  },
  {
    path: "/vuedemo",
    name: "vuedemo",
    component: () => import("@/views/demo.vue"),
  },
  {
    path: "/independent",
    name: "independent",
    component: () => import("@/views/independentpage/ParticlesPage.vue"),
    children: [
      {
        path: "/independent/particles",
        name: "particles",
        component: () => import("@/views/independentpage/ParticlesPage.vue"),
      },
    ],
  },
];
