export default [
  {
    path: "/center/:userId",
    name: "center",
    component: () => import("@/views/account/center"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/account/settings"),
    children: [
      {
        path: "/settings",
        redirect: "/settings/basic",
      },
      {
        path: "/settings/basic",
        name: "BasicSettings",
        meta: { title: "基本设置" },
        component: () => import("@/views/account/settings/page/BasicSettings"),
      },
      {
        path: "/settings/security",
        name: "SecuritySettings",
        meta: { title: "安全设置" },
        component: () => import("@/views/account/settings/page/Security"),
      },
      {
        path: "/settings/wallet",
        name: "MyWallet",
        meta: { title: "我的钱包" },
        component: () => import("@/views/account/settings/page/Wallet"),
      },
      {
        path: "/settings/homepage",
        name: "PageSettings",
        meta: { title: "编辑主页" },
        component: () => import("@/views/account/settings/page/PageSettings"),
      },
    ],
  },
];
