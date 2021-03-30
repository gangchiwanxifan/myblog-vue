export default [
  {
    path: "/blog/add",
    name: "addBlog",
    component: () => import("@/views/blog/AddBlog"),
  },

  {
    path: "blog/draft",
    name: "draft",
    component: () => import("@/views/blog/Draft"),
  },
];
