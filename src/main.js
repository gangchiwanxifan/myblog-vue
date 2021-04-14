import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import { Icon } from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "./global.less"; // global style
import VueCropper from "vue-cropper"; // 图片裁剪
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "./permission"; // permission control

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueCropper);
Vue.use(mavonEditor);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2484263_9uuduvohx09.js", // 在 iconfont.cn 上生成
});

Vue.component("IconFont", IconFont);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
