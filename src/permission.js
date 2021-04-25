import router from "./router";
import { check } from "./utils/auth";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "@/components/NProgress/nprogress.less";

NProgress.configure({ showSpinner: false }); // 转圈太丑了 NProgress Configuration

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    notification.error({
      message: "403",
      description: "你没有权限访问，请联系管理员咨询",
    });
    next({ path: "/403" });
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
