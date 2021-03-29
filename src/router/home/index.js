export default [
  {
    path: "/",
    redirect: "/about",
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About"),
  },
];
