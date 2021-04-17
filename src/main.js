import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import { Icon, message } from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "./global.less"; // global style
import VueCropper from "vue-cropper"; // 图片裁剪
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "./permission"; // permission control

Vue.config.productionTip = false;
// Vue.config.devtools = false;

Vue.use(Antd);
Vue.use(VueCropper);
Vue.use(mavonEditor);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2484263_haneq2ec6ca.js", // 在 iconfont.cn 上生成
});

message.config({
  // top: `10px`,
  duration: 1,
  maxCount: 1,
});

Vue.component("IconFont", IconFont);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
