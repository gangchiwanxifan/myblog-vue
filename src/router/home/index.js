export default [
  {
    path: "/",
    name: "home",
    // redirect: "/about",
    component: () => import("@/views/home"),
  },
  {
    path: "/channel",
    name: "about",
    component: () => import("@/views/home/channel"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/home/search"),
  },
];
