<template>
  <footer class="blog-footer">
    <p>
      <a>关于我们</a>
      <span>|</span>
      <a>加入我们</a>
      <span>|</span>
      <a>联系我们</a>
      <span>|</span>
      <a>帮助中心</a>
    </p>
    <p>
      <span>{{ copyright }}</span>
      <a>{{ record }}</a>
    </p>
  </footer>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      copyright: "Copyright © Simple Blog Created by gcwxf",
      record: "浙ICP备 - xxxxxxx号",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      request({
        url: "/config",
        method: "post",
      }).then((res) => {
        if (res.data.data) {
          const data = res.data.data;
          this.copyright = data.copyright;
          this.record = data.record;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.blog-footer {
  font-size: 12px;
  span {
    padding: 0 10px;
  }
}
</style>
