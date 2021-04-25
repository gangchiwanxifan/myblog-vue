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
    meta: { authority: ["admin"] },
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
        component: () => import("@/views/test/Test4"),
      },
      {
        path: "/test2",
        component: () => import("@/views/test/Test3"),
      },
    ],
  },
  {
    path: "/403",
    component: () => import("@/views/exception/403"),
  },
  {
    path: "*",
    component: () => import("@/views/exception/404"),
  },
];

// 解决路由跳转重复会报错
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
