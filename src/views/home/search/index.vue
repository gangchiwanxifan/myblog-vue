<template>
  <div class="container-index">
    <div style="max-width: 1000px; margin: 0 auto">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            搜索文章
            <!-- <a-icon type="search" /> -->
          </span>
          <blog-list :keyword="keyword"></blog-list>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            搜索用户
            <!-- <a-icon type="search" /> -->
          </span>
          <user-list :keyword="keyword"></user-list>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import userList from "./userList";
import blogList from "./blogList";

export default {
  components: {
    userList,
    blogList,
  },
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.keyword = this.$route.query.keyword;
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.query != from.query) {
        this.keyword = this.$route.query.keyword;
      }
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.container-index {
  background-color: #fff;
  // border-top: 1px solid #e7e7e7;
  min-height: 80vh;
}
/deep/ .no-data {
  margin: 20px auto;
  width: 100%;
  height: 350px;
  background: url(/no-data2.png) no-repeat center top #fff;
  border-radius: 12px;
}
/deep/ .ant-tabs-nav {
  margin-top: 20px;
  .ant-tabs-tab {
    font-size: 18px;
    color: #00a1d6;
  }
  .ant-tabs-ink-bar {
    width: 100px;
    background-color: #00a1d6;
  }
}
/deep/ .total-wrap {
  line-height: 16px;
  color: #99a2aa;
  font-size: 12px;
  // padding-left: 15px;
}
</style>
