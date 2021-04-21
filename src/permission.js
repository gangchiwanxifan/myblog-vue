import router from "./router";
import NProgress from "nprogress";
import "@/components/NProgress/nprogress.less";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
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
