export default [
  {
    path: "/blog/edit",
    name: "addBlog",
    component: () => import("@/views/blog/Edit"),
  },

  {
    path: "/blog/draft",
    name: "draft",
    component: () => import("@/views/blog/Draft"),
  },

  {
    path: "/blog/:id",
    component: () => import("@/views/blog/Detail"),
  },
];
