import Vue from "vue";
import VueRouter from "vue-router";
import user from "./user";
import admin from "./admin";
import home from "./home";
import account from "./account";
import blog from "./blog";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    // component: { render: h => h("router-view") },
    component: () => import("@/layouts/UserLayout"),
    children: [...user],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout"),
    children: [...admin],
  },
  {
    path: "/",
    component: () => import("@/layouts/BasicLayout"),
    children: [
      // 首页
      ...home,
      // 文章
      ...blog,
      // 用户设置
      ...account,
      {
        path: "/test",
        component: () => import("@/views/test/Test1"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("@/views/exception/404"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
