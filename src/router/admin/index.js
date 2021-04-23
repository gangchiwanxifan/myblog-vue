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
    component: () => import("@/views/admin/channel"),
  },
  {
    path: "/admin/blog",
    component: () => import("@/views/admin/article"),
  },
  {
    path: "/admin/comment",
    component: () => import("@/views/admin/comment"),
  },
  {
    path: "/admin/user",
    component: () => import("@/views/admin/user"),
  },
  {
    path: "/admin/role",
    component: () => import("@/views/admin/role"),
  },
  {
    path: "/admin/system",
    component: () => import("@/views/admin/system"),
  },
];
