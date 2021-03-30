<template>
  <div style="background-color: #fff; min-height: 70vh">
    <div style="max-width: 800px; margin: 0 auto; padding-bottom: 50px">
      <h2 class="head-title">
        草稿箱
        <span class="count">（{{ this.data.length }}）</span>
      </h2>
      <div></div>
      <a-spin v-if="loading" size="large" />
      <a-list v-else item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <img
            style="margin-right: 20px"
            width="160"
            alt="logo"
            :src="item.blogAvatar"
          />
          <a-list-item-meta>
            <div slot="description">
              <div>{{ item.blogDescription.slice(0, 20) }}</div>
              <div>最后修改时间：{{ item.updateTime }}</div>
            </div>
            <a slot="title" href="https://www.antdv.com/">{{
              item.blogTitle
            }}</a>
          </a-list-item-meta>
          <a-button>编辑</a-button>
          <a-divider type="vertical"></a-divider>
          <a-button type="danger" @click="showDeleteConfirm(item.blogId)"
            >删除</a-button
          >
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  mounted() {
    this.getDrafts();
  },
  data() {
    return {
      data: {},
      loading: true,
    };
  },
  methods: {
    getDrafts() {
      // const userId = this.$store.state.user.userInfo.userId;
      request({
        url: "blog/draft",
        method: "post",
        data: { userId: this.$store.state.user.userInfo.userId },
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    // 删除
    showDeleteConfirm(blogId) {
      const _this = this;
      this.$confirm({
        title: "确定删除该草稿?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          request({
            url: "/blog/delete",
            method: "post",
            data: { blogId: blogId },
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("删除成功");
              _this.loading = true;
              _this.getDrafts();
            } else {
              _this.$message.error("删除失败");
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>

<style scoped>
.head-title {
  display: inline-block;
  font-weight: 400;
  font-size: 20px;
  color: #222;
  height: 67px;
  line-height: 67px;
}
.count {
  font-size: 14px;
  color: #99a2aa;
}
</style>
