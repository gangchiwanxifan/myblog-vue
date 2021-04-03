export default [
  {
    path: "/",
    name: "home",
    // redirect: "/about",
    component: () => import("@/views/home"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About"),
  },
];
