export default [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
  },
  {
    path: "/admin/dashboard",
    name: "dashboard",
    component: () => import("@/views/admin/dashboard"),
  },
  {
    path: "/admin/channel",
    name: "channel",
    component: () => import("@/views/admin/channel"),
  },
];
