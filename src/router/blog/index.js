export default [
  {
    path: "/blog/edit",
    name: "addBlog",
    meta: { authority: ["user", "admin"] },
    component: () => import("@/views/blog/Edit"),
  },
  {
    path: "/blog/edit/:blogId",
    name: "editBlog",
    meta: { authority: ["user", "admin"] },
    component: () => import("@/views/blog/Edit"),
  },
  {
    path: "/blog/draft",
    name: "draft",
    meta: { authority: ["user", "admin"] },
    component: () => import("@/views/blog/Draft"),
  },

  {
    path: "/blog/:id",
    component: () => import("@/views/blog/Detail"),
  },
];
