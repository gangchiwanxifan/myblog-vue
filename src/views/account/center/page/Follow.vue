<template>
  <div class="page-container">
    <a-card
      :bordered="false"
      :bodyStyle="{ height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="page-head">
        <p class="page-head-title">全部关注</p>
      </div>
      <a-spin :spinning="loading" size="large">
        <a-list
          v-if="data.length"
          item-layout="horizontal"
          :data-source="data"
          :pagination="pagination"
        >
          <div slot="footer">没有更多啦~</div>
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.introduction">
              <div slot="title">
                <a style="font-size: 16px; color: rgb(251, 114, 153)">{{
                  item.nickname
                }}</a>
                &nbsp;
                <span style="color: #aaa; font-size: 12px; padding: 10px">
                  {{ item.createTime }}
                </span>
              </div>
              <img
                class="avatar"
                size="large"
                slot="avatar"
                :src="item.avatar"
              />
            </a-list-item-meta>
            <div slot="actions">
              <a-button
                type="primary"
                style="background-color: rgb(251, 114, 153); border: 0"
                @click="$router.push({ path: `/center/${item.followUserId}` })"
                ><a-icon type="home" />TA的主页</a-button
              >
            </div>
          </a-list-item>
        </a-list>
        <div v-else class="no-data" />
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      data: [],
      pagination: {
        pageSize: 10,
      },
      loading: false,
    };
  },
  mounted() {
    this.getFollowList();
  },
  computed: {
    homeId() {
      return this.$route.params.userId;
    },
  },
  methods: {
    getFollowList() {
      this.loading = true;
      request({
        url: "/follow/follows",
        method: "post",
        data: { followFanId: this.homeId },
      }).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
          this.loading = false;
        } else {
          this.$message.error("加载失败");
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 16px;
  .page-head {
    line-height: 30px;
    .page-head-title {
      color: #222;
      font-size: 18px;
    }
  }
  .avatar {
    border-radius: 50%;
    width: 50px;
  }
  .no-data {
    margin: 40px auto;
    // width: 100%;
    height: 400px;
    background: url(/no-data2.png) no-repeat center top #fff;
    border-radius: 12px;
  }
}
</style>
