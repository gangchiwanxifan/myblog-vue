<template>
  <div class="page-container">
    <a-card
      :bordered="false"
      :bodyStyle="{ padding: '16px 0', height: '100%' }"
      :style="{ height: '100%' }"
    >
      <div class="page-article-main">
        <div class="page-article-left">
          <a-menu
            mode="inline"
            :style="{ border: '0', width: '100%' }"
            :selectedKeys="selectedKeys"
          >
            <a-menu-item key="1" @click="updateMenu('1')">文章管理</a-menu-item>
            <a-menu-item key="2" @click="updateMenu('2')">收藏文章</a-menu-item>
          </a-menu>
        </div>
        <div class="page-article-right">
          <a-list item-layout="horizontal" :data-source="data">
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
                <a
                  slot="title"
                  href="https://www.antdv.com/"
                  :style="{
                    color: '#000',
                    fontSize: '17px',
                    fontWeight: '500',
                  }"
                  >{{ item.blogTitle }}</a
                >
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
    </a-card>
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
      data: [],
      selectedKeys: ["1"],
    };
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
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
  },
};
</script>

<style lang="less" scoped>
.page-container {
  margin-top: 16px;
  .page-article-main {
    width: 100%;
    display: flex;
    height: 100%;
    .page-article-left {
      border-right: 1px solid #e8e8e8;
      width: 210px;
    }
    .page-article-right {
      flex: 1 1;
      padding: 8px 40px;
    }
  }
}
</style>
