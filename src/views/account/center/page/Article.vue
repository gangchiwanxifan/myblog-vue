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
            <a-menu-item key="1" @click="updateMenu('1')">{{
              userId == homeId ? "文章管理" : "TA的文章"
            }}</a-menu-item>
            <a-menu-item key="2" @click="updateMenu('2')">收藏文章</a-menu-item>
          </a-menu>
        </div>
        <div class="page-article-right">
          <a-spin :spinning="loading" size="large">
            <!-- 用户文章列表 -->
            <a-list
              v-if="this.selectedKeys[0] == 1"
              item-layout="horizontal"
              :data-source="data1"
              :pagination="pagination"
            >
              <a-list-item slot="renderItem" slot-scope="item">
                <img
                  style="margin-right: 20px"
                  width="160"
                  alt="logo"
                  :src="item.blogAvatar"
                />
                <a-list-item-meta>
                  <div slot="description">
                    <div>{{ item.blogDescription.slice(0, 20) + "..." }}</div>
                    <div>最后修改时间：{{ item.updateTime }}</div>
                  </div>
                  <a
                    slot="title"
                    @click="$router.push({ path: `/blog/${item.blogId}` })"
                    :style="{
                      color: '#000',
                      fontSize: '17px',
                      fontWeight: '500',
                    }"
                    >{{ item.blogTitle }}</a
                  >
                </a-list-item-meta>
                <div v-if="userId == homeId">
                  <a-button
                    @click="$router.push({ path: `/blog/edit/${item.blogId}` })"
                    >编辑
                  </a-button>
                  <a-divider type="vertical"></a-divider>
                  <a-button
                    type="danger"
                    @click="showDeleteConfirm(item.blogId)"
                    >删除
                  </a-button>
                </div>
              </a-list-item>
            </a-list>

            <!-- 收藏列表 -->
            <a-list
              v-else
              item-layout="vertical"
              size="large"
              :pagination="pagination"
              :data-source="data2"
            >
              <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <img
                  slot="extra"
                  height="125px"
                  alt="logo"
                  :src="item.blogAvatar"
                />
                <a-list-item-meta>
                  <a
                    :style="{
                      color: '#222',
                      fontSize: '17px',
                      fontWeight: '500',
                    }"
                    slot="title"
                    @click="$router.push({ path: `/blog/${item.blogId}` })"
                    class="list-title"
                    >{{ item.blogTitle }}</a
                  >
                </a-list-item-meta>
                <div class="description">
                  {{ item.blogDescription }}
                </div>
                <!--action-->
                <template slot="actions">
                  <span>
                    <a-icon type="user" style="margin-right: 8px" />
                    {{ item.nickname }}
                  </span>
                  <span>
                    <a-icon type="heart" style="margin-right: 8px" />
                    {{ item.favoriteCount }}
                  </span>
                  <span>
                    <a-icon type="message" style="margin-right: 8px" />
                    {{ item.commentCount }}
                  </span>
                  <span>
                    <a-icon type="eye" style="margin-right: 8px" />
                    {{ item.blogViews }}
                  </span>
                </template>
              </a-list-item>
            </a-list>
          </a-spin>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  mounted() {
    this.getList();
    // this.getFavorite();
    // console.log(this.selectedKeys[0] == 1);
  },
  data() {
    return {
      data1: [],
      data2: [],
      selectedKeys: ["1"],
      loading: true,
      pagination: {
        pageSize: 7,
      },
    };
  },
  computed: {
    homeId() {
      return this.$route.params.userId;
    },
    userId() {
      return this.$store.state.user.userInfo.userId;
    },
  },
  methods: {
    updateMenu(selectedKey) {
      if (this.selectedKeys != [selectedKey]) {
        this.selectedKeys = [selectedKey];
      }
    },
    getList() {
      this.loading = true;
      request({
        url: "blog/list/user",
        method: "post",
        data: { blogAuthorId: this.homeId },
      }).then((res) => {
        if (res.data.data) {
          this.data1 = res.data.data;
          this.loading = false;
        }
      });
    },
    getFavorite() {
      this.loading = true;
      request({
        url: "blog/list/favorite",
        method: "post",
        data: { userId: this.homeId },
      }).then((res) => {
        if (res.data.data) {
          this.data2 = res.data.data;
          this.loading = false;
        }
      });
    },
    showDeleteConfirm(blogId) {
      const _this = this;
      this.$confirm({
        title: "确定删除该文章?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          _this.$message.loading("删除中，请稍等...", 0);
          request({
            url: "/blog/delete",
            method: "post",
            data: { blogId: blogId },
          }).then((res) => {
            if (res.data.data) {
              _this.$message.success("删除成功");
              _this.loading = true;
              _this.getList();
            } else {
              _this.$message.error("删除失败");
            }
          });
        },
      });
    },
  },
  watch: {
    selectedKeys: function (val) {
      if (val[0] == 1) {
        this.getList();
      } else if (val[0] == 2) {
        this.getFavorite();
      }
    },
    homeId: function () {
      this.$router.go(0);
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
