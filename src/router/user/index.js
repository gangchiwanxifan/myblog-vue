export default [
  {
    path: "/user",
    redirect: "/user/login",
  },
  {
    path: "/user/login",
    name: "login",
    component: () => import("@/views/user/Login"),
  },
  {
    path: "/user/register",
    name: "register",
    component: () => import("@/views/user/Register"),
  },
  {
    path: "/user/result",
    name: "registerResult",
    component: () => import("@/views/user/RegisterResult"),
  },
];
