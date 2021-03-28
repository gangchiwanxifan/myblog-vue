import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "./components/NProgress/nprogress.less";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    // component: { render: h => h("router-view") },
    component: () => import("./layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () => import("./views/user/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import("./views/user/Register"),
      },
      {
        path: "/user/result",
        name: "registerResult",
        component: () => import("./views/user/RegisterResult"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("./layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/about",
      },
      {
        path: "/about",
        name: "about",
        component: () => import("./views/About"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("./layouts/AdminLayout"),
    children: [
      {
        path: "/admin",
        redirect: "/admin/dashboard",
      },
      {
        path: "/admin/dashboard",
        name: "dashboard",
        component: () => import("./views/admin/dashboard"),
      },
      {
        path: "/admin/channel",
        name: "channel",
        component: () => import("./views/admin/channel"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("./views/exception/404"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
